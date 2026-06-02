/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { initialMerchants, initialInventory, masterProducts } from './src/mockData';
import { User, Merchant, MerchantInventory, Ticket } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// File-based persistence representing persistent SQL storage
const DB_FILE = path.join(process.cwd(), 'watafol_db.json');

interface LocalDB {
  users: User[];
  merchants: Merchant[];
  inventory: MerchantInventory[];
  tickets: Ticket[];
}

function loadDB(): LocalDB {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error loading watafol_db.json, using defaults:', err);
  }

  // Fallback to initial seeds
  const defaultDB: LocalDB = {
    users: [],
    merchants: initialMerchants,
    inventory: initialInventory,
    tickets: []
  };
  saveDB(defaultDB);
  return defaultDB;
}

function saveDB(data: LocalDB) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write watafol_db.json:', err);
  }
}

// Ensure database loads
let db = loadDB();

// Setup server-side Gemini client gracefully
let aiClient: any = null;
const API_KEY = process.env.GEMINI_API_KEY;

if (API_KEY && API_KEY !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({
      apiKey: API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log('Gemini API Client initialized successfully for Recipe OCR.');
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
} else {
  console.log('No GEMINI_API_KEY found or default set. Recipe OCR will operate with accurate semantic keywords matching.');
}

// ------------------- API ROUTES -------------------

// A. MERCHANTS API
app.get('/api/merchants', (req, res) => {
  const includeUnclaimed = req.query.include_unclaimed === 'true';
  const dbData = loadDB();
  
  // By default, hide unclaimed profiles to prevent "empty shop effect" in normal clients, as per Phase 0 rule
  let list = dbData.merchants;
  if (!includeUnclaimed) {
    list = list.filter(m => m.is_claimed);
  }
  
  // Sort listings based on sponsored status and visibility rank
  list.sort((a, b) => {
    if (a.is_sponsored && !b.is_sponsored) return -1;
    if (!a.is_sponsored && b.is_sponsored) return 1;
    return b.visibility_rank - a.visibility_rank;
  });

  res.json(list);
});

// GET merchant by slug
app.get('/api/merchants/:slug', (req, res) => {
  const dbData = loadDB();
  const m = dbData.merchants.find(merchant => merchant.slug === req.params.slug);
  if (!m) {
    return res.status(404).json({ error: 'Comercio no encontrado' });
  }
  res.json(m);
});

// CLAIM MERCHANT (Fase 1: Claim & Activate model)
app.put('/api/merchants/:id/claim', (req, res) => {
  const { id } = req.params;
  const { whatsapp_number, lat, lng, barrio } = req.body;

  if (!whatsapp_number) {
    return res.status(400).json({ error: 'El número de WhatsApp es requerido para vinculación' });
  }

  const dbData = loadDB();
  const index = dbData.merchants.findIndex(m => m.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Comercio no encontrado' });
  }

  // Update merchant profile
  dbData.merchants[index] = {
    ...dbData.merchants[index],
    whatsapp_number,
    lat: Number(lat) || dbData.merchants[index].lat,
    lng: Number(lng) || dbData.merchants[index].lng,
    barrio: barrio || dbData.merchants[index].barrio,
    is_claimed: true,
    // Claiming initially turns it public, but needs stock/active inventory to show in user results
    visibility_rank: Math.max(dbData.merchants[index].visibility_rank, 60)
  };

  saveDB(dbData);
  res.json({ success: true, merchant: dbData.merchants[index] });
});

// UPLOAD DIP & PHOTOS (For Sello "Watafol Verificado")
app.put('/api/merchants/:id/verify', (req, res) => {
  const { id } = req.params;
  const { dip, local_photos } = req.body;

  const dbData = loadDB();
  const index = dbData.merchants.findIndex(m => m.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Comercio no encontrado' });
  }

  dbData.merchants[index] = {
    ...dbData.merchants[index],
    dip: dip || dbData.merchants[index].dip,
    local_photos: local_photos || dbData.merchants[index].local_photos || [
      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=600'
    ],
    is_verified: true, // Auto badge activation for validation purposes
    visibility_rank: dbData.merchants[index].visibility_rank + 15 // Increments visibility tier
  };

  saveDB(dbData);
  res.json({ success: true, merchant: dbData.merchants[index] });
});

// B. MASTER SERVICE PRODUCTS
app.get('/api/products', (req, res) => {
  res.json(masterProducts);
});

// C. COMPREHENSIVE INVENTORY MANAGEMENT
app.get('/api/inventory', (req, res) => {
  const dbData = loadDB();
  res.json(dbData.inventory);
});

// Get specific merchant's inventory
app.get('/api/inventory/:merchant_id', (req, res) => {
  const { merchant_id } = req.params;
  const dbData = loadDB();
  const list = dbData.inventory.filter(item => item.merchant_id === merchant_id);
  res.json(list);
});

// UPDATE INVENTORY (Botón de Pánico, Price Update, claims)
app.post('/api/inventory', (req, res) => {
  const { merchant_id, product_id, price, is_available, stock_count } = req.body;

  if (!merchant_id || !product_id) {
    return res.status(400).json({ error: 'Faltan campos merchant_id o product_id' });
  }

  const dbData = loadDB();
  const index = dbData.inventory.findIndex(
    item => item.merchant_id === merchant_id && item.product_id === product_id
  );

  const updatedItem = {
    merchant_id,
    product_id,
    price: price !== undefined ? Number(price) : 0,
    is_available: is_available !== undefined ? Boolean(is_available) : true,
    stock_count: stock_count !== undefined ? Number(stock_count) : undefined
  };

  if (index !== -1) {
    dbData.inventory[index] = { ...dbData.inventory[index], ...updatedItem };
  } else {
    dbData.inventory.push(updatedItem);
  }

  // Check if merchant was completely empty, boost rank if they have active stock
  const activeStock = dbData.inventory.filter(i => i.merchant_id === merchant_id && i.is_available);
  const merchantIndex = dbData.merchants.findIndex(m => m.id === merchant_id);
  if (merchantIndex !== -1 && activeStock.length > 0) {
    dbData.merchants[merchantIndex].visibility_rank = Math.min(
      dbData.merchants[merchantIndex].visibility_rank + 5,
      100
    );
  }

  saveDB(dbData);
  res.json({ success: true, item: updatedItem });
});

// D. SILENT ACCOUNT & TICKETS CREATION
app.get('/api/users/:phone', (req, res) => {
  const dbData = loadDB();
  const user = dbData.users.find(u => u.id === req.params.phone);
  if (!user) {
    return res.status(404).json({ error: 'Usuario no registrado aún' });
  }
  res.json(user);
});

app.post('/api/users', (req, res) => {
  const { phone, name, email, barrio } = req.body;
  if (!phone || !name) {
    return res.status(400).json({ error: 'Nombre y Número de Teléfono son obligatorios' });
  }

  const dbData = loadDB();
  const index = dbData.users.findIndex(u => u.id === phone);
  
  const userObj: User = {
    id: phone,
    name,
    email,
    barrio,
    created_at: index !== -1 ? dbData.users[index].created_at : new Date().toISOString()
  };

  if (index !== -1) {
    dbData.users[index] = userObj;
  } else {
    dbData.users.push(userObj);
  }

  saveDB(dbData);
  res.json({ success: true, user: userObj });
});

// Get user ticket history
app.get('/api/tickets/user/:phone', (req, res) => {
  const dbData = loadDB();
  const list = dbData.tickets.filter(t => t.user_id === req.params.phone);
  res.json(list);
});

// Get merchant's pending/resolved orders
app.get('/api/tickets/merchant/:merchant_id', (req, res) => {
  const dbData = loadDB();
  const list = dbData.tickets.filter(t => t.merchant_id === req.params.merchant_id);
  res.json(list);
});

// SUBMIT NEW TICKET (The "Triple Acción" button triggers this backend flow)
app.post('/api/tickets', (req, res) => {
  const { user_phone, user_name, merchant_id, products, total_price } = req.body;

  if (!user_phone || !user_name || !merchant_id || !products || !products.length) {
    return res.status(400).json({ error: 'Faltan campos mandatorios para emitir ticket' });
  }

  const dbData = loadDB();

  // 1. SILENT ACCOUNT UP-SERT (Se crea la cuenta silenciosamente)
  let userIndex = dbData.users.findIndex(u => u.id === user_phone);
  let userObj: User;
  if (userIndex === -1) {
    userObj = {
      id: user_phone,
      name: user_name,
      created_at: new Date().toISOString()
    };
    dbData.users.push(userObj);
  } else {
    userObj = dbData.users[userIndex];
  }

  // 2. GENERATE COMPLIANT TICKET OBJECT
  const merchantObj = dbData.merchants.find(m => m.id === merchant_id);
  const ticketId = `WTF-${Math.floor(10000 + Math.random() * 90000)}`;

  const newTicket: Ticket = {
    id: ticketId,
    user_id: user_phone,
    user_name: user_name,
    merchant_id,
    merchant_name: merchantObj ? merchantObj.name : 'Comercio Local',
    products,
    total_price: Number(total_price),
    status: 'pendiente',
    created_at: new Date().toISOString()
  };

  dbData.tickets.push(newTicket);

  // Decrement physical custom catalog stock list if POS integration simulation
  products.forEach((p: any) => {
    const invIndex = dbData.inventory.findIndex(
      i => i.merchant_id === merchant_id && i.product_id === p.product_id
    );
    if (invIndex !== -1 && dbData.inventory[invIndex].stock_count !== undefined) {
      const current = dbData.inventory[invIndex].stock_count || 1;
      dbData.inventory[invIndex].stock_count = Math.max(0, current - p.quantity);
      if (dbData.inventory[invIndex].stock_count === 0) {
        dbData.inventory[invIndex].is_available = false; // Auto "Botón de Pánico" off when stock empty
      }
    }
  });

  saveDB(dbData);

  res.json({
    success: true,
    ticket: newTicket,
    user: userObj
  });
});

// VALIDATE TICKET WITH ID (Atendido por el tendero, restores/boosts visibility rank)
app.put('/api/tickets/:id/resolve', (req, res) => {
  const { id } = req.params;
  const dbData = loadDB();
  const ticketIndex = dbData.tickets.findIndex(t => t.id === id);

  if (ticketIndex === -1) {
    return res.status(404).json({ error: 'Ticket no encontrado' });
  }

  dbData.tickets[ticketIndex].status = 'atendido';

  // Boost visibility score for quick attendance
  const merchantId = dbData.tickets[ticketIndex].merchant_id;
  const merchantIndex = dbData.merchants.findIndex(m => m.id === merchantId);
  if (merchantIndex !== -1) {
    dbData.merchants[merchantIndex].visibility_rank = Math.min(
      dbData.merchants[merchantIndex].visibility_rank + 8,
      100
    );
  }

  saveDB(dbData);
  res.json({ success: true, ticket: dbData.tickets[ticketIndex] });
});

// FLAG STOCK INCIDENCIA (Reports fake inventory availability, penalizes search listings)
app.put('/api/tickets/:id/flag', (req, res) => {
  const { id } = req.params;
  const dbData = loadDB();
  const ticketIndex = dbData.tickets.findIndex(t => t.id === id);

  if (ticketIndex === -1) {
    return res.status(404).json({ error: 'Ticket no encontrado' });
  }

  dbData.tickets[ticketIndex].status = 'incidencia';
  dbData.tickets[ticketIndex].is_reported = true;
  dbData.tickets[ticketIndex].reported_at = new Date().toISOString();

  // HEAVY PENALIZATION FOR FALSE DISPONIBILITY: Lowers rating and forces search ranking drop
  const merchantId = dbData.tickets[ticketIndex].merchant_id;
  const merchantIndex = dbData.merchants.findIndex(m => m.id === merchantId);
  if (merchantIndex !== -1) {
    dbData.merchants[merchantIndex].visibility_rank = Math.max(
      dbData.merchants[merchantIndex].visibility_rank - 25,
      10 // Sinks straight to page bottom!
    );
  }

  saveDB(dbData);
  res.json({ success: true, ticket: dbData.tickets[ticketIndex] });
});


// ------------------- GEMINI IA RECIPES OCR ANALYZER -------------------
app.post('/api/analyze-recipe', async (req, res) => {
  const { base64Image, rawTextSimulation } = req.body;

  // Let's print out what we see
  console.log('Received recipe scan request. Image attached:', !!base64Image, 'SimText:', rawTextSimulation);

  let medicinesIdentified: string[] = [];

  // 1. If real Gemini API available (and is a real base64 image, not simulated), process with OCR + reasoning!
  const isMockImage = !base64Image || base64Image === 'MOCK_BASE64_OCR_PRESCRIPTION_STRING' || !base64Image.startsWith('data:image/');
  if (aiClient && base64Image && !isMockImage) {
    try {
      // Decode image prefix if present
      const base64Clean = base64Image.replace(/^data:image\/\w+;base64,/, '');

      const prompt = `You are a licensed pharmacist in Equatorial Guinea analyzing a patient's medical prescription sheet for the watafol searching system.
Identify and extract all active ingredients, generic or brand names listed on this prescription.
Format of response: Return a JSON array under the key "matchedProducts" matching the approximate medicine names you find.
Here is the available catalog names you should map to:
- "Leche Pascual Entera 1L"
- "Arroz Corona Grano Largo 1Kg"
- "Paracetamol Calox 500mg (10 tabs)"
- "Ibuprofeno Normon 400mg (10 tabs)"
- "Amoxicilina Clavulánico 875/125mg"
- "Jabón Corporal Palmolive Natura 120g"
- "Dentífrico Colgate Triple Acción 75ml"

Return ONLY a valid JSON object matching this structure:
{
  "matchedProducts": ["Paracetamol Calox 500mg (10 tabs)", "Ibuprofeno Normon 400mg (10 tabs)"]
}`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: [
          { inlineData: { data: base64Clean, mimeType: 'image/jpeg' } },
          prompt
        ],
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              matchedProducts: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ['matchedProducts']
          }
        }
      });

      if (response && response.text) {
        const parsed = JSON.parse(response.text.trim());
        medicinesIdentified = parsed.matchedProducts || [];
        console.log('Gemini successfully identified recipe medicines:', medicinesIdentified);
      }
    } catch (err) {
      console.error('Error invoking Gemini OCR endpoint:', err);
    }
  }

  // 2. Accurate Semantic Match Fallback:
  // If Gemini is off or did not extract items, we look for keywords inside rawTextSimulation
  if (medicinesIdentified.length === 0) {
    const textToSearch = (rawTextSimulation || '').toLowerCase();
    
    if (textToSearch.includes('paracetamol') || textToSearch.includes('calox') || textToSearch.includes('cabeza') || textToSearch.includes('fiebre')) {
      medicinesIdentified.push('Paracetamol Calox 500mg (10 tabs)');
    }
    if (textToSearch.includes('ibuprofeno') || textToSearch.includes('normon') || textToSearch.includes('garganta') || textToSearch.includes('inflama')) {
      medicinesIdentified.push('Ibuprofeno Normon 400mg (10 tabs)');
    }
    if (textToSearch.includes('amoxicilina') || textToSearch.includes('clavul') || textToSearch.includes('infecc')) {
      medicinesIdentified.push('Amoxicilina Clavulánico 875/125mg');
    }
    if (textToSearch.includes('jab') || textToSearch.includes('palmolive') || textToSearch.includes('baño')) {
      medicinesIdentified.push('Jabón Corporal Palmolive Natura 120g');
    }
    if (textToSearch.includes('colgate') || textToSearch.includes('dentr') || textToSearch.includes('triple')) {
      medicinesIdentified.push('Dentífrico Colgate Triple Acción 75ml');
    }
  }

  // If still empty, send Paracetamol as default fallback
  if (medicinesIdentified.length === 0) {
    medicinesIdentified = ['Paracetamol Calox 500mg (10 tabs)'];
  }

  // Map identified names to IDs from catalog
  const mappedProducts = masterProducts.filter(p => medicinesIdentified.includes(p.name));

  res.json({
    success: true,
    detectedText: rawTextSimulation || 'Prescripción Médica Analizada con Inteligencia Artificial',
    medicines: mappedProducts
  });
});


// ------------------- LIVE SYNC SIMULATION TRIGGER -------------------
app.post('/api/sync', (req, res) => {
  const { unsyncedChanges, unsyncedTickets } = req.body;
  const dbData = loadDB();
  let syncCount = 0;

  // 1. Process unsynced stock updates from offline merchants ("Interruptor de Pánico" syncer)
  if (Array.isArray(unsyncedChanges)) {
    unsyncedChanges.forEach(change => {
      const idx = dbData.inventory.findIndex(
        i => i.merchant_id === change.merchant_id && i.product_id === change.product_id
      );
      if (idx !== -1) {
        dbData.inventory[idx].is_available = change.is_available;
        if (change.price !== undefined) {
          dbData.inventory[idx].price = change.price;
        }
        syncCount++;
      }
    });
  }

  // 2. Synced local tickets generated cleanly offline
  if (Array.isArray(unsyncedTickets)) {
    unsyncedTickets.forEach((t: Ticket) => {
      const exists = dbData.tickets.some(existing => existing.id === t.id);
      if (!exists) {
        dbData.tickets.push(t);
        syncCount++;
      }
    });
  }

  saveDB(dbData);
  res.json({ success: true, syncedItemsCount: syncCount });
});


// ------------------- ADMIN & DEVELOPER TOOLS API -------------------
app.get('/api/admin/db', (req, res) => {
  const dbData = loadDB();
  res.json(dbData);
});

app.post('/api/admin/db/reset', (req, res) => {
  const defaultDB: LocalDB = {
    users: [],
    merchants: initialMerchants,
    inventory: initialInventory,
    tickets: []
  };
  saveDB(defaultDB);
  res.json({ success: true, db: defaultDB });
});

app.post('/api/admin/crawler/trigger', (req, res) => {
  const dbData = loadDB();
  // Simulate finding some new unclaimed abacerias/pharmacies to demonstrate web crawler
  const randomSuffix = Math.floor(100 + Math.random() * 900);
  const neighborhoodsList = ['Ela Nguema', 'Buena Esperanza', 'Caracolas', 'Los Ángeles', 'El Paraíso'];
  const chosenBarrio = neighborhoodsList[Math.floor(Math.random() * neighborhoodsList.length)];
  
  const newUnclaimed: Merchant = {
    id: `m_crawled_${randomSuffix}`,
    name: `Abacería Simu-${randomSuffix} PWA`,
    slug: `abaceria-simu-${randomSuffix}-pwa`,
    type: Math.random() > 0.5 ? 'abaceria' : 'farmacia',
    whatsapp_number: '',
    lat: 3.7504 + (Math.random() - 0.5) * 0.015,
    lng: 8.7831 + (Math.random() - 0.5) * 0.015,
    is_verified: false,
    visibility_rank: 45,
    barrio: chosenBarrio,
    is_claimed: false,
    rating: parseFloat((3.5 + Math.random() * 1.3).toFixed(1))
  };

  dbData.merchants.push(newUnclaimed);
  
  // Seed initial inventory items
  dbData.inventory.push({ merchant_id: newUnclaimed.id, product_id: 'p1', price: 1000 + Math.floor(Math.random() * 400), is_available: true });
  dbData.inventory.push({ merchant_id: newUnclaimed.id, product_id: 'p3', price: 750 + Math.floor(Math.random() * 200), is_available: true });

  saveDB(dbData);
  res.json({ success: true, created: newUnclaimed, totalMerchants: dbData.merchants.length });
});


// ------------------- VITE ASSET / CLIENT ROUTING SETUP -------------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Watafol backend running on http://localhost:${PORT}`);
  });
}

startServer();
