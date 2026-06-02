/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Building, ShoppingBag, Smartphone, Database, MapPin, 
  Wifi, WifiOff, Camera, CheckCircle2, AlertTriangle, ChevronRight, 
  ArrowLeft, Check, Plus, Minus, Info, X, SlidersHorizontal, 
  Sparkles, Upload, Clock, Lock, User, Store, QrCode, Megaphone, 
  Globe, ChevronDown, Flame, HeartHandshake, ShieldCheck
} from 'lucide-react';
import { Merchant, ProductMaster, MerchantInventory, Ticket, User as AppUser } from './types';

// Translation Dictionaries (ES Default, FR, EN)
const TRANSLATIONS = {
  es: {
    logo: 'Watafol',
    subtitle: 'Abacerías y Farmacias de Guinea Ecuatorial',
    searchPlaceholder: 'Buscar leche, paracetamol, arroz...',
    all: 'Todo',
    alimentacion: 'Alimentación',
    farmacia: 'Farmacia',
    higiene: 'Higiene',
    nearMe: 'Buscar cerca de mí',
    dataSaver: 'Modo Ahorro de Datos',
    dataSaverActive: 'Solo texto y miniaturas ligeras para ahorrar tus megas',
    offlineMode: 'Simular Modo Offline',
    offlineBanner: 'Navegando sin Conexión (Modo Offline) - Datos respaldados localmente',
    verified: 'Watafol Verificado',
    unclaimed: 'No reclamado (Crawler)',
    claimThis: 'Reclamar esta tienda',
    activeProducts: 'recetarios activos',
    priceParity: 'Paridad de precios física garantizada',
    economical: 'Más Económico',
    closest: 'Más Cercano',
    cart: 'Mi Ticket Digital',
    checkout: 'Generar Reserva (WhatsApp)',
    panicButton: 'Botón de Pánico (Disponibilidad instantánea)',
    outOfStock: 'Agotado',
    available: 'Disponible',
    substituteSuggested: 'Sustituto Sugerido',
    silentRegisterTitle: 'Cerrar Reserva',
    silentRegisterDesc: 'Introduce tus datos por única vez para crear tu cuenta silenciosa en Watafol con tu número de teléfono.',
    customerName: 'Tu Nombre (para entrega)',
    customerPhone: 'Número de Teléfono (Identificador Único)',
    sendWhatsAppBtn: 'Enviar Reserva por WhatsApp',
    orderHistory: 'Historial de Tickets',
    sellerPanel: 'Panel Comercial',
    validationTitle: 'Validación de Ticket',
    validationPlaceholder: 'Ingresar ID de Ticket (ej. WTF-10294)',
    verifyBtn: 'Validar Ticket',
    recipeTitle: 'Analizador de Recetas con IA',
    recipeDesc: 'Sube la foto de tu receta médica para extraer medicamentos por IA y localizar farmacias con stock en Malabo.',
    analyzeBtn: 'Analizar Receta por IA',
    uploadPhoto: 'Fotografiar Receta',
    claimTitle: 'Reclamar y Activar Comercio',
    claimDesc: 'Vincula tu número de teléfono y posición GPS real para hacer público tu establecimiento.',
    gpsConfirm: 'Confirmar ubicación actual (Pin GPS)',
    productManagement: 'Administración de Inventario',
    unclaimedAlert: 'Este comercio fue registrado automáticamente por nuestro web crawler. Reclámalo gratis.',
    noResults: 'No se encontraron resultados para tu búsqueda',
    alternativeShops: 'Tiendas que tienen este producto',
    rating: 'Calificación',
    neighborhood: 'Barrio/Referencia',
    sponsored: 'Patrocinado',
    incidenceBtn: 'Incidencia de Stock',
    incidenceReported: 'Incidencia reportada. Afectará la visibilidad del comercio por mala disponibilidad.',
    incidenceDesc: 'Si fuiste al local y el producto no estaba disponible físicamente, repórtalo aquí.',
    successOrderTitle: '¡Ticket Generado con Éxito!',
    successOrderDesc: 'Hemos creado silenciosamente tu cuenta Watafol y generado un Ticket Digital descargable.',
    downloadVoucher: 'Descargar Ticket Visual'
  },
  fr: {
    logo: 'Watafol',
    subtitle: 'Épiceries et Pharmacies de Guinée Équatoriale',
    searchPlaceholder: 'Rechercher du lait, paracétamol, riz...',
    all: 'Tout',
    alimentacion: 'Alimentation',
    farmacia: 'Pharmacie',
    higiene: 'Hygiène',
    nearMe: 'Rechercher près de moi',
    dataSaver: 'Mode Économie de Données',
    dataSaverActive: 'Uniquement texte et miniatures légères pour économiser vos mégas',
    offlineMode: 'Simuler Mode Hors-ligne',
    offlineBanner: 'Navigation Hors-ligne - Données sauvegardées localement',
    verified: 'Watafol Vérifié',
    unclaimed: 'Non réclamé (Crawler)',
    claimThis: 'Réclamer ce magasin',
    activeProducts: 'produits actifs',
    priceParity: 'Parité des prix physiques garantie',
    economical: 'Le moins cher',
    closest: 'Le plus proche',
    cart: 'Mon Ticket Numérique',
    checkout: 'Générer Réservation (WhatsApp)',
    panicButton: 'Bouton de Panique (Disponibilité instantanée)',
    outOfStock: 'Épuisé',
    available: 'Disponible',
    substituteSuggested: 'Substitut Suggéré',
    silentRegisterTitle: 'Fermer la Réservation',
    silentRegisterDesc: 'Saisissez vos données une seule fois pour créer silencieusement votre compte Watafol.',
    customerName: 'Votre Nom',
    customerPhone: 'Numéro de Téléphone (Identifiant Unique)',
    sendWhatsAppBtn: 'Envoyer Réservation via WhatsApp',
    orderHistory: 'Historique des Tickets',
    sellerPanel: 'Panneau Commercial',
    validationTitle: 'Validation de Ticket',
    validationPlaceholder: 'Saisir ID de Ticket (ex: WTF-10294)',
    verifyBtn: 'Valider Ticket',
    recipeTitle: 'Analyseur de Recettes par IA',
    recipeDesc: 'Prenez en photo votre ordonnance médicale pour en extraire les médicaments.',
    analyzeBtn: 'Analyser par IA',
    uploadPhoto: 'Prendre Ordonnance en photo',
    claimTitle: 'Réclamer et Activer',
    claimDesc: 'Associez votre numéro de téléphone et position GPS réelle.',
    gpsConfirm: 'Confirmer GPS actuel',
    productManagement: 'Gestion des stocks',
    unclaimedAlert: 'Ce magasin a été indexé par notre crawler. Réclamez-le gratuitement.',
    noResults: 'Aucun résultat trouvé',
    alternativeShops: 'Magasins proposant ce produit',
    rating: 'Évaluation',
    neighborhood: 'Quartier',
    sponsored: 'Sponsorisé',
    incidenceBtn: 'Anomalie de Stock',
    incidenceReported: 'Anomalie signalée. Impactera le classement de visibilité.',
    incidenceDesc: 'Si le produit était épuisé lors de votre visite, signalez-le.',
    successOrderTitle: 'Ticket Généré !',
    successOrderDesc: 'Compte créé silencieusement et ticket numérique généré.',
    downloadVoucher: 'Télécharger Ticket Visuelle'
  },
  en: {
    logo: 'Watafol',
    subtitle: 'Grocery Shops & Pharmacies of Equatorial Guinea',
    searchPlaceholder: 'Search milk, paracetamol, rice...',
    all: 'All',
    alimentacion: 'Groceries',
    farmacia: 'Pharmacy',
    higiene: 'Personal Care',
    nearMe: 'Search near me',
    dataSaver: 'Data-Saver Mode',
    dataSaverActive: 'Only text and ultralight thumbnails to save your internet megabytes',
    offlineMode: 'Simulate Offline Mode',
    offlineBanner: 'Browsing Offline - Local cache enabled',
    verified: 'Watafol Verified',
    unclaimed: 'Unclaimed (Crawler)',
    claimThis: 'Claim this business',
    activeProducts: 'active items',
    priceParity: 'Physical price parity guaranteed',
    economical: 'Cheapest First',
    closest: 'Closest First',
    cart: 'My Digital Ticket',
    checkout: 'Generate Ticket (WhatsApp)',
    panicButton: 'Panic Switch (Instant Availability)',
    outOfStock: 'Out of Stock',
    available: 'Available',
    substituteSuggested: 'Suggested Substitute',
    silentRegisterTitle: 'Finalize Reservation',
    silentRegisterDesc: 'Provide your details once to establish your quiet Watafol phone account.',
    customerName: 'Your Name',
    customerPhone: 'Phone Number (Unique Identifier)',
    sendWhatsAppBtn: 'Send Order via WhatsApp',
    orderHistory: 'Ticket History',
    sellerPanel: 'Merchant Panel',
    validationTitle: 'Ticket Validation',
    validationPlaceholder: 'Enter Ticket ID (e.g., WTF-10294)',
    verifyBtn: 'Validate Ticket',
    recipeTitle: 'AI Recipe Analyzer',
    recipeDesc: 'Take a picture of your recipe sheet to pull medicine stocks with Gemini OCR.',
    analyzeBtn: 'Analyze with AI',
    uploadPhoto: 'Photograph Recipe',
    claimTitle: 'Claim & Activate Business',
    claimDesc: 'Bind your phone number and confirm real premises GPS location pin.',
    gpsConfirm: 'Confirm Current GPS Pin',
    productManagement: 'Inventory Controls',
    unclaimedAlert: 'This business was auto-found by our web crawler. Claim it for free.',
    noResults: 'No matches found',
    alternativeShops: 'Alternative stores carrying this item',
    rating: 'Rating',
    neighborhood: 'Neighborhood/Barrio',
    sponsored: 'Featured',
    incidenceBtn: 'Stock Discrepancy',
    incidenceReported: 'Discrepancy reported. Merchat visibility ranking penalized.',
    incidenceDesc: 'Report if you visited physically and product was out-of-stock.',
    successOrderTitle: 'Ticket Generated Successfully!',
    successOrderDesc: 'Quiet account created and downloadable digital coupon ready.',
    downloadVoucher: 'Download Visual Ticket'
  }
};

type Language = 'es' | 'fr' | 'en';

export default function App() {
  // Locale State
  const [lang, setLang] = useState<Language>('es');
  const t = TRANSLATIONS[lang];

  // Routing State ('home' | 'search-results' | 'merchant-profile' | 'product-detail' | 'checkout' | 'user-dashboard' | 'seller-dashboard')
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductMaster | null>(null);

  // Cart State (stored locally)
  const [cart, setCart] = useState<Array<{ product: ProductMaster; merchant: Merchant; quantity: number; price: number }>>([]);

  // Data saver & Offline Simul
  const [dataSaver, setDataSaver] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  
  // Search parameters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [rankingFilter, setRankingFilter] = useState<'economical' | 'closest'>('closest');

  // Backend state stored in UI cache
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [products, setProducts] = useState<ProductMaster[]>([]);
  const [inventories, setInventories] = useState<MerchantInventory[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  
  // User Authentication Simulation (Silent account persistence)
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);

  // Offline Pending Queues (Background Sync Simulation)
  const [unsyncedStockChanges, setUnsyncedStockChanges] = useState<any[]>([]);
  const [unsyncedTickets, setUnsyncedTickets] = useState<any[]>([]);

  // Coordinates emulation of user in Malabo Center
  const [userLat, setUserLat] = useState<number>(3.7504);
  const [userLng, setUserLng] = useState<number>(8.7831);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('Ela Nguema');
  const [isLoadingGPS, setIsLoadingGPS] = useState<boolean>(false);

  // AI Recipe OCR Upload Scanner Simulation
  const [isRecipeScanning, setIsRecipeScanning] = useState<boolean>(false);
  const [scanResultMedicines, setScanResultMedicines] = useState<ProductMaster[]>([]);
  const [selectedSampleRecipeIdx, setSelectedSampleRecipeIdx] = useState<number>(-1);
  const [customFileMockText, setCustomFileMockText] = useState<string>('');

  // Seller claim workflow
  const [claimMerchantTarget, setClaimMerchantTarget] = useState<Merchant | null>(null);
  const [claimPhone, setClaimPhone] = useState<string>('');
  const [sellerDIPFile, setSellerDIPFile] = useState<string>('');
  const [claimGPSLocked, setClaimGPSLocked] = useState<boolean>(false);

  // Success order popup
  const [latestTicketCreated, setLatestTicketCreated] = useState<Ticket | null>(null);

  // Loaded mock prescriptives
  const samplePrescriptions = [
    {
      name: 'Receta para Gripe (Ibuprofeno + Paracetamol)',
      raw_text: 'Receta: Tomar Paracetamol 500mg tres veces al día por dolor de cabeza. Ibuprofeno 400mg cada 8 horas.',
      medicines: ['p4', 'p5']
    },
    {
      name: 'Receta de Infección (Amoxicilina)',
      raw_text: 'Diagnóstico: Amoxicilina Clavulánico 875/125mg cada 12 horas por 7 días.',
      medicines: ['p6']
    },
    {
      name: 'Receta General Mixta (Gripe + Jabón)',
      raw_text: 'Recomienda: Paracetamol Calox 500mg y un Jabón de Baño neutro Palmolive Natura.',
      medicines: ['p4', 'p7']
    }
  ];

  // Fetch initial data from server
  const loadServerData = async () => {
    try {
      const includeParam = currentView === 'seller-dashboard' ? '?include_unclaimed=true' : '';
      const [resMerchants, resProducts, resInventory] = await Promise.all([
        fetch(`/api/merchants${includeParam}`).then(r => r.json()),
        fetch('/api/products').then(r => r.json()),
        fetch('/api/inventory').then(r => r.json())
      ]);

      setMerchants(resMerchants);
      setProducts(resProducts);
      setInventories(resInventory);
    } catch (err) {
      console.log('Using local fallback state (offline friendly):', err);
    }
  };

  useEffect(() => {
    loadServerData();
  }, [currentView]);

  // Load persistence configurations from localStorage on load
  useEffect(() => {
    const savedUser = localStorage.getItem('wt_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    
    // Set lang
    const savedLang = localStorage.getItem('wt_lang');
    if (savedLang) {
      setLang(savedLang as Language);
    }

    // Load local offline changes
    const offlineStock = localStorage.getItem('wt_offline_stock');
    if (offlineStock) setUnsyncedStockChanges(JSON.parse(offlineStock));
    const offlineTickets = localStorage.getItem('wt_offline_tickets');
    if (offlineTickets) setUnsyncedTickets(JSON.parse(offlineTickets));
  }, []);

  // Sync back offline queues when reconnecting
  const triggerOnlineSync = async () => {
    if (isOffline) return;
    try {
      const response = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unsyncedChanges: unsyncedStockChanges,
          unsyncedTickets: unsyncedTickets
        })
      });
      const data = await response.json();
      if (data.success) {
        console.log('Offline queue successfully synchronized on cloud DB:', data.syncedItemsCount);
        setUnsyncedStockChanges([]);
        setUnsyncedTickets([]);
        localStorage.removeItem('wt_offline_stock');
        localStorage.removeItem('wt_offline_tickets');
        loadServerData();
      }
    } catch (err) {
      console.error('Sincronización fallida:', err);
    }
  };

  useEffect(() => {
    if (!isOffline && (unsyncedStockChanges.length > 0 || unsyncedTickets.length > 0)) {
      triggerOnlineSync();
    }
  }, [isOffline]);

  // Emulate client browser native GPS activation
  const requestGPSLoc = () => {
    setIsLoadingGPS(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          // Precise coordinate found
          setUserLat(pos.coords.latitude);
          setUserLng(pos.coords.longitude);
          setIsLoadingGPS(false);
          console.log('GPS secured physical coordinates:', pos.coords.latitude, pos.coords.longitude);
        },
        (error) => {
          // Fallback coordinate emulation
          console.log('Fallback to simulated centroid (Malabo central):', error);
          setUserLat(3.7504);
          setUserLng(8.7831);
          setIsLoadingGPS(false);
        }
      );
    } else {
      setUserLat(3.7504);
      setUserLng(8.7831);
      setIsLoadingGPS(false);
    }
  };

  // Convert GPS degrees into proximity distance mapping helper (Haversine approximation)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((R * c).toFixed(2));
  };

  // Neighborhood coordinate table for fallback
  const NEIGHBORHOOD_COORDS: Record<string, { lat: number, lng: number }> = {
    'Ela Nguema': { lat: 3.7540, lng: 8.7940 },
    'Buena Esperanza': { lat: 3.7380, lng: 8.7900 },
    'Caracolas': { lat: 3.7565, lng: 8.7692 },
    'Los Ángeles': { lat: 3.7525, lng: 8.7815 },
    'El Paraíso': { lat: 3.7420, lng: 8.7750 }
  };

  const handleNeighborhoodChange = (neighborhood: string) => {
    setSelectedNeighborhood(neighborhood);
    const coords = NEIGHBORHOOD_COORDS[neighborhood];
    if (coords) {
      setUserLat(coords.lat);
      setUserLng(coords.lng);
    }
  };

  // CART WORKFLOW
  const handleAddToCart = (product: ProductMaster, merchant: Merchant, price: number) => {
    const index = cart.findIndex(
      item => item.product.id === product.id && item.merchant.id === merchant.id
    );
    if (index !== -1) {
      const updated = [...cart];
      updated[index].quantity += 1;
      setCart(updated);
    } else {
      setCart([...cart, { product, merchant, quantity: 1, price }]);
    }
  };

  const updateCartQuantity = (productId: string, merchantId: string, amount: number) => {
    const index = cart.findIndex(
      item => item.product.id === productId && item.merchant.id === merchantId
    );
    if (index === -1) return;
    const updated = [...cart];
    updated[index].quantity += amount;
    if (updated[index].quantity <= 0) {
      updated.splice(index, 1);
    }
    setCart(updated);
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // Submit Reservation ticket - Triple Action
  const submitReservation = async (phone: string, name: string) => {
    if (cart.length === 0) return;

    // Single consolidated ticket schema built offline-friendly
    const targetMerchant = cart[0].merchant;
    const ticketProducts = cart.map(item => ({
      product_id: item.product.id,
      name: item.product.name,
      price: item.price,
      quantity: item.quantity
    }));
    const totalVal = getCartTotal();
    const tempTicketId = `WTF-${Math.floor(10000 + Math.random() * 90000)}`;

    const localTicket: Ticket = {
      id: tempTicketId,
      user_id: phone,
      user_name: name,
      merchant_id: targetMerchant.id,
      merchant_name: targetMerchant.name,
      products: ticketProducts,
      total_price: totalVal,
      status: 'pendiente',
      created_at: new Date().toISOString()
    };

    // Store user credentials silenced in localStorage
    const savedUser: AppUser = { id: phone, name, created_at: new Date().toISOString() };
    setCurrentUser(savedUser);
    localStorage.setItem('wt_user', JSON.stringify(savedUser));

    // ACTION A: Construct and Trigger dynamic WhatsApp Deep Link URI
    // Build Structured Single Object JSON translated text for Whatsapp API
    let textBody = `*Watafol Ticket Digital: ${tempTicketId}*\n`;
    textBody += `*Cliente:* ${name} (${phone})\n`;
    textBody += `*Establecimiento:* ${targetMerchant.name}\n`;
    textBody += `*Ubicación Barrio:* ${targetMerchant.barrio}\n`;
    textBody += `-------------------------\n`;
    cart.forEach(item => {
      textBody += `- ${item.product.name} (x${item.quantity}) - ${item.price * item.quantity} XAF\n`;
    });
    textBody += `-------------------------\n`;
    textBody += `*Total Reserva:* ${totalVal} XAF (Garantía de Paridad)\n\n`;
    textBody += `Copie este ticket y muéstrelo al llegar a la tienda. Ubicación de recogida GPS del local: `;
    textBody += `https://www.google.com/maps/search/?api=1&query=${targetMerchant.lat},${targetMerchant.lng}`;

    const waUri = `https://wa.me/${targetMerchant.whatsapp_number.replace('+', '')}?text=${encodeURIComponent(textBody)}`;

    // ACTION B: Generate Visual downloadable receipt (Offline Voucher simulation on Browser)
    setLatestTicketCreated(localTicket);

    // ACTION C: Persistent API Call structure
    if (isOffline) {
      // Local Sync Queue
      const offlineTicketsQueue = [...unsyncedTickets, localTicket];
      setUnsyncedTickets(offlineTicketsQueue);
      localStorage.setItem('wt_offline_tickets', JSON.stringify(offlineTicketsQueue));
      setCart([]);
      
      // Open WhatsApp Redirect directly
      window.open(waUri, '_blank');
    } else {
      try {
        const response = await fetch('/api/tickets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_phone: phone,
            user_name: name,
            merchant_id: targetMerchant.id,
            products: ticketProducts,
            total_price: totalVal
          })
        });
        const serverData = await response.json();
        if (serverData.success) {
          console.log('Ticket registered in central backend.');
          setCart([]);
          // Open WhatsApp window
          window.open(waUri, '_blank');
        }
      } catch (err) {
        console.error('Error post-ticket submission:', err);
        // Fail-safe fallback queue triggers
        const offlineTicketsQueue = [...unsyncedTickets, localTicket];
        setUnsyncedTickets(offlineTicketsQueue);
        localStorage.setItem('wt_offline_tickets', JSON.stringify(offlineTicketsQueue));
        setCart([]);
        window.open(waUri, '_blank');
      }
    }
  };

  // OCR Prescriptions Camera Processing
  const analyzeMedicalRecipe = async () => {
    setIsRecipeScanning(true);
    setScanResultMedicines([]);

    let rawTextToSend = customFileMockText;
    let base64Mock = '';

    // If chose sample, load metadata details
    if (selectedSampleRecipeIdx >= 0) {
      const pCase = samplePrescriptions[selectedSampleRecipeIdx];
      rawTextToSend = pCase.raw_text;
    }

    try {
      const response = await fetch('/api/analyze-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          base64Image: base64Mock || 'MOCK_BASE64_OCR_PRESCRIPTION_STRING',
          rawTextSimulation: rawTextToSend
        })
      });
      const resData = await response.json();
      
      setTimeout(() => {
        setIsRecipeScanning(false);
        if (resData.success) {
          setScanResultMedicines(resData.medicines || []);
          setSelectedCategory('all');
          setSearchQuery('');
        }
      }, 1500); // 1.5s scanning effect

    } catch (err) {
      console.error('Recipe parsing system failure:', err);
      setIsRecipeScanning(false);
    }
  };

  // SELLER CONTROLS: Panico Stock Switch (Offline-first synced state)
  const toggleSellerAvailability = async (merchantId: string, productId: string, isAvailable: boolean) => {
    // 1. Update inventories list cache instantly (Offline first)
    const updatedInvs = inventories.map(item => {
      if (item.merchant_id === merchantId && item.product_id === productId) {
        return { ...item, is_available: isAvailable };
      }
      return item;
    });
    setInventories(updatedInvs);

    // Save offline queue trigger
    const offlineChangeItem = { merchant_id: merchantId, product_id: productId, is_available: isAvailable };

    if (isOffline) {
      const updatedQueue = [...unsyncedStockChanges, offlineChangeItem];
      setUnsyncedStockChanges(updatedQueue);
      localStorage.setItem('wt_offline_stock', JSON.stringify(updatedQueue));
    } else {
      try {
        const itemObj = inventories.find(i => i.merchant_id === merchantId && i.product_id === productId);
        await fetch('/api/inventory', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            merchant_id: merchantId,
            product_id: productId,
            is_available: isAvailable,
            price: itemObj?.price || 1000
          })
        });
      } catch (err) {
        console.warn('Network issue while trying to sync stock. Storing offline:', err);
        const updatedQueue = [...unsyncedStockChanges, offlineChangeItem];
        setUnsyncedStockChanges(updatedQueue);
        localStorage.setItem('wt_offline_stock', JSON.stringify(updatedQueue));
      }
    }
  };

  // Reclaim un-claimed layout
  const handleClaimSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimMerchantTarget || !claimPhone) return;

    try {
      const response = await fetch(`/api/merchants/${claimMerchantTarget.id}/claim`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          whatsapp_number: claimPhone,
          lat: userLat,
          lng: userLng,
          barrio: selectedNeighborhood
        })
      });
      const data = await response.json();
      
      if (data.success) {
        // Automatically upload DIP to request Sello "Verificado" Watafol and gain ranking scores
        await fetch(`/api/merchants/${claimMerchantTarget.id}/verify`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dip: sellerDIPFile || 'DIP-PENDING-VETTING-LOCAL-9924',
            local_photos: [
              'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=600'
            ]
          })
        });

        // Instantiate initial stocks automatically for small abacerías by activating 4 products
        const defaultSelection = ['p1', 'p2', 'p3', 'p7', 'p8'];
        await Promise.all(
          defaultSelection.map(pid => 
            fetch('/api/inventory', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                merchant_id: claimMerchantTarget.id,
                product_id: pid,
                price: pid === 'p1' ? 1200 : pid === 'p2' ? 1900 : pid === 'p3' ? 850 : 500,
                is_available: true
              })
            })
          )
        );

        setClaimMerchantTarget(null);
        setClaimPhone('');
        alert('¡Felicidades! Tu comercio ya está Activo y Verificado en Watafol con ubicación GPS confirmada.');
        loadServerData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Ticket validations inside quick validation field
  const [validationCode, setValidationCode] = useState<string>('');
  const [validationMessage, setValidationMessage] = useState<string>('');

  const validateCodeFn = async () => {
    if (!validationCode) return;
    try {
      const res = await fetch(`/api/tickets/${validationCode}/resolve`, {
        method: 'PUT'
      });
      const data = await res.json();
      if (data.success) {
        setValidationMessage(`¡Éxito! Ticket ${validationCode} validado y marcado como Atendido.`);
        setValidationCode('');
        loadServerData();
      } else {
        setValidationMessage('Error: Código de ticket no existente.');
      }
    } catch (err) {
      setValidationMessage('Error de red. Ticket guardado localmente para validación.');
    }
  };

  // Register incidence error for fake availability
  const reportIncidence = async (ticketId: string) => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}/flag`, { method: 'PUT' });
      const data = await response.json();
      if (data.success) {
        alert(t.incidenceReported);
        loadServerData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ------------------- ADMIN & DEVELOPER STATE & API HANDLERS -------------------
  const [adminDB, setAdminDB] = useState<any>(null);
  const [crawlerLog, setCrawlerLog] = useState<string>('');
  const [isAdminActionLoading, setIsAdminActionLoading] = useState<boolean>(false);
  const [adminActiveTab, setAdminActiveTab] = useState<'simulation' | 'db-inspector' | 'visibility-rules'>('simulation');

  const fetchAdminDB = async () => {
    try {
      const res = await fetch('/api/admin/db');
      const data = await res.json();
      setAdminDB(data);
    } catch (err) {
      console.error('Failed to load DB details:', err);
    }
  };

  const triggerCrawlerSim = async () => {
    setIsAdminActionLoading(true);
    setCrawlerLog('Iniciando rastreador web de abacerías y farmacias...');
    try {
      const res = await fetch('/api/admin/crawler/trigger', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setCrawlerLog(`¡Éxito! El crawler automatizado localizó e indexó un nuevo comercio en la base de datos: "${data.created.name}" en el barrio de ${data.created.barrio} (Rating: ${data.created.rating}★, Estado: NO RECLAMADO).`);
        loadServerData();
        fetchAdminDB();
      }
    } catch (err) {
      setCrawlerLog('Fallo al ejecutar la simulación del crawler en el backend.');
    } finally {
      setIsAdminActionLoading(false);
    }
  };

  const triggerDatabaseReset = async () => {
    if (!window.confirm('¿Estás seguro de que deseas restablecer la base de datos a sus valores semilla iniciales? Se borrarán todos los tickets interactivos y perfiles de usuarios registrados silenciosamente.')) {
      return;
    }
    setIsAdminActionLoading(true);
    try {
      const res = await fetch('/api/admin/db/reset', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setCrawlerLog('Base de datos restablecida correctamente a sus valores pre-sembrados iniciales.');
        setCurrentUser(null);
        localStorage.removeItem('wt_user');
        setCart([]);
        loadServerData();
        fetchAdminDB();
      }
    } catch (err) {
      setCrawlerLog('Error al restablecer la base de datos.');
    } finally {
      setIsAdminActionLoading(false);
    }
  };

  useEffect(() => {
    if (currentView === 'admin-dashboard') {
      fetchAdminDB();
    }
  }, [currentView]);

  // FILTERS AND MATCHING ALGORITHMS
  const getFilteredShopsForProduct = (productId: string) => {
    return merchants.filter(merchant => {
      // Must be claimed to be visible to clients, as per Phase 0 rule
      if (!merchant.is_claimed) return false;

      // Must have active stock in inventory
      const invIdx = inventories.find(
        i => i.merchant_id === merchant.id && i.product_id === productId && i.is_available
      );
      return !!invIdx;
    }).map(merchant => {
      const invItem = inventories.find(
        i => i.merchant_id === merchant.id && i.product_id === productId
      )!;
      const distance = calculateDistance(userLat, userLng, merchant.lat, merchant.lng);
      return {
        ...merchant,
        price: invItem.price,
        distance
      };
    }).sort((a, b) => {
      if (rankingFilter === 'economical') {
        return a.price - b.price;
      } else {
        return a.distance - b.distance;
      }
    });
  };

  // Matching algorithm of Central Search
  const getSearchedProducts = () => {
    if (scanResultMedicines.length > 0) {
      return scanResultMedicines;
    }

    return products.filter(p => {
      const categoryMatch = selectedCategory === 'all' || p.category === selectedCategory;
      const queryMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && queryMatch;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] selection:bg-brand-500 selection:text-white">
      {/* Offline Status Warning Bar */}
      {isOffline && (
        <div className="bg-amber-500 text-neutral-900 border-b border-amber-600 text-center py-2 px-4 font-mono text-xs flex items-center justify-center gap-2">
          <WifiOff size={14} className="animate-pulse" />
          <span>{t.offlineBanner}</span>
        </div>
      )}

      {/* Header Panel */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo & Category Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setCurrentView('home'); setScanResultMedicines([]); }}>
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-sm hover:scale-105 transition-transform">
              <span className="font-serif text-xl font-bold">W</span>
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold tracking-tight text-brand-600">{t.logo}</h1>
              <p className="text-[10px] text-neutral-500 -mt-0.5 hidden sm:block">{t.subtitle}</p>
            </div>
          </div>

          {/* Right Header Icons Bundle */}
          <div className="flex items-center gap-2">
            
            {/* Malabo, GE Pill */}
            <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-neutral-500 bg-neutral-100 px-3 py-1.5 rounded-full">
              <svg className="w-3 h-3 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
              </svg>
              Malabo, GE
            </div>

            {/* Lang Dropdown */}
            <div className="relative group mr-2">
              <button className="flex items-center gap-1 text-xs text-neutral-500 border border-neutral-200 hover:border-neutral-300 py-1.5 px-3 rounded-lg bg-neutral-100 cursor-pointer">
                <Globe size={13} className="text-neutral-400" />
                <span className="uppercase font-mono font-medium">{lang}</span>
                <ChevronDown size={12} className="text-neutral-400" />
              </button>
              <div className="absolute right-0 top-full mt-1 w-28 bg-white border border-neutral-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-20">
                <button onClick={() => setLang('es')} className="w-full text-left font-mono text-xs hover:bg-neutral-100 py-2 px-3 block">ESPAÑOL</button>
                <button onClick={() => setLang('fr')} className="w-full text-left font-mono text-xs hover:bg-neutral-100 py-2 px-3 block">FRANÇAIS</button>
                <button onClick={() => setLang('en')} className="w-full text-left font-mono text-xs hover:bg-neutral-100 py-2 px-3 block">ENGLISH</button>
              </div>
            </div>

            {/* Offline Simulation Button */}
            <button
              onClick={() => setIsOffline(!isOffline)}
              className={`p-2 rounded-lg cursor-pointer ${
                isOffline 
                  ? 'bg-amber-100 text-amber-700 border border-amber-300' 
                  : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
              }`}
              title="Simular Modo Offline"
            >
              {isOffline ? <WifiOff size={16} /> : <Wifi size={16} />}
            </button>

            {/* Unified Client/Partner/Dev Navigation Switch */}
            <nav className="flex items-center gap-1 bg-neutral-100/80 p-1 rounded-xl border border-neutral-200">
              <button
                onClick={() => { setCurrentView('home'); setScanResultMedicines([]); }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-sans font-semibold transition-all cursor-pointer ${
                  currentView === 'home' || currentView === 'product-detail' || currentView === 'merchant-profile' || currentView === 'checkout'
                    ? 'bg-white text-brand-700 shadow-xs font-bold'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                <Search size={13} className="text-brand-600" />
                <span className="hidden lg:inline">Buscador</span>
              </button>

              <button
                onClick={() => setCurrentView('user-dashboard')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-sans font-semibold transition-all cursor-pointer ${
                  currentView === 'user-dashboard'
                    ? 'bg-white text-brand-700 shadow-xs font-bold'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                <User size={13} className="text-brand-600" />
                <span className="hidden lg:inline">Usuarios</span>
              </button>

              <button
                onClick={() => setCurrentView('seller-dashboard')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-sans font-semibold transition-all cursor-pointer ${
                  currentView === 'seller-dashboard'
                    ? 'bg-white text-brand-700 shadow-xs font-bold'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                <Store size={13} className="text-brand-600" />
                <span className="hidden lg:inline">Comercios</span>
              </button>

              <button
                onClick={() => setCurrentView('admin-dashboard')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-sans font-semibold transition-all cursor-pointer ${
                  currentView === 'admin-dashboard'
                    ? 'bg-white text-brand-700 shadow-xs font-bold'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                <SlidersHorizontal size={13} className="text-brand-600" />
                <span className="hidden lg:inline">Admin/Dev</span>
              </button>
            </nav>

            {/* Simple Floating Cart Button */}
            {cart.length > 0 && (
              <button
                onClick={() => setCurrentView('checkout')}
                className="relative p-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white cursor-pointer shadow-sm animate-bounce"
              >
                <ShoppingBag size={16} />
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white font-mono text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </button>
            )}

          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4">
        
        {/* Success Modal for reservation completed */}
        {latestTicketCreated && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-neutral-100 relative">
              <button 
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 cursor-pointer"
                onClick={() => setLatestTicketCreated(null)}
              >
                <X size={18} />
              </button>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">{t.successOrderTitle}</h3>
                <p className="text-xs text-neutral-500 mt-1">{t.successOrderDesc}</p>
              </div>

              {/* Offline visual digital coupon */}
              <div className="bg-[#FAF9F5] border-2 border-dashed border-neutral-200 rounded-xl p-5 mb-5 font-mono text-xs">
                <div className="flex justify-between items-center pb-3 border-b border-neutral-200 border-dashed">
                  <span className="font-bold tracking-wider">WATAFOL VOUCHER</span>
                  <span className="bg-brand-100 text-brand-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    {latestTicketCreated.id}
                  </span>
                </div>
                <div className="space-y-2 py-3 text-neutral-700">
                  <p><strong>Cliente:</strong> {latestTicketCreated.user_name}</p>
                  <p><strong>Contacto ID:</strong> {latestTicketCreated.user_id}</p>
                  <p><strong>Comercio:</strong> {latestTicketCreated.merchant_name}</p>
                  <p><strong>Fecha:</strong> {new Date(latestTicketCreated.created_at).toLocaleString()}</p>
                  <div className="pt-2 border-t border-neutral-200 border-dashed">
                    <p className="font-bold mb-1">Productos:</p>
                    {latestTicketCreated.products.map((p, idx) => (
                      <p key={idx} className="flex justify-between">
                        <span>- {p.name} (x{p.quantity})</span>
                        <span>{p.price * p.quantity} XAF</span>
                      </p>
                    ))}
                  </div>
                </div>
                <div className="pt-3 border-t border-neutral-200 border-dashed flex justify-between items-center text-sm font-bold text-neutral-900">
                  <span>TOTAL ESTIMADO:</span>
                  <span>{latestTicketCreated.total_price} XAF</span>
                </div>
                <div className="text-[10px] text-center text-neutral-400 mt-4 leading-normal">
                  Conserva esta captura o archivo. El local cuenta con stock apartado. Realiza el pago físico mediante Mobile Money (QR) o efectivo.
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const blob = new Blob([JSON.stringify(latestTicketCreated, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `ticket-${latestTicketCreated.id}.json`;
                    a.click();
                  }}
                  className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-mono py-2.5 rounded-xl text-xs font-semibold cursor-pointer text-center"
                >
                  {t.downloadVoucher}
                </button>
                <button
                  onClick={() => setLatestTicketCreated(null)}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-sans py-2.5 rounded-xl text-xs font-semibold cursor-pointer text-center"
                >
                  Entendido / Volver
                </button>
              </div>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          
          {/* HOME COMPONENT */}
          {currentView === 'home' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Dynamic Welcome Heading */}
              <div className="text-center md:text-left md:flex items-center justify-between bg-brand-100 rounded-2xl p-6 border border-neutral-200">
                <div className="space-y-1">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold italic tracking-tight text-stone-900">
                    {currentUser ? `¡Hola de nuevo, ${currentUser.name}!` : 'Encuentra y Reserva en Guinea Ecuatorial'}
                  </h2>
                  <p className="text-xs text-stone-600">
                    Buscador de existencias en el acto. Reserva tu material en abacerías y farmacias y retira con WhatsApp.
                  </p>
                </div>
                
                {/* Micro settings */}
                <div className="mt-4 md:mt-0 flex gap-2 justify-center">
                  <div className="flex items-center gap-2 bg-white/80 py-1.5 px-3 rounded-xl border border-neutral-200">
                    <SlidersHorizontal size={14} className="text-neutral-500" />
                    <span className="text-[11px] font-mono font-medium">{t.dataSaver}</span>
                    <input
                      type="checkbox"
                      checked={dataSaver}
                      onChange={(e) => setDataSaver(e.target.checked)}
                      className="rounded accent-brand-600 w-3.5 h-3.5"
                    />
                  </div>
                </div>
              </div>

              {/* Central Search Engine & Barrio Filters */}
              <div className="bg-white rounded-2xl p-6 shadow-xs border border-neutral-100 space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (scanResultMedicines.length > 0) setScanResultMedicines([]);
                    }}
                    placeholder={t.searchPlaceholder}
                    className="w-full bg-neutral-50 text-neutral-900 border border-neutral-200 focus:border-brand-500 py-3.5 px-11 rounded-xl outline-hidden focus:ring-1 focus:ring-brand-500 text-sm"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer">
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* GPS and manually neighborhood fallback triggers */}
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={requestGPSLoc}
                      className="flex items-center justify-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-1.5 px-3 rounded-lg text-xs font-medium cursor-pointer transition-colors"
                      disabled={isLoadingGPS}
                    >
                      <MapPin size={13} className="text-brand-600" />
                      <span>{isLoadingGPS ? 'Ubicando...' : t.nearMe}</span>
                    </button>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      GPS: {userLat.toFixed(4)}, {userLng.toFixed(4)}
                    </span>
                  </div>

                  {/* Manual Barrio Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400">{t.neighborhood}:</span>
                    <select
                      value={selectedNeighborhood}
                      onChange={(e) => handleNeighborhoodChange(e.target.value)}
                      className="bg-neutral-50 text-xs border border-neutral-200 rounded-lg p-1 font-sans cursor-pointer focus:border-brand-500"
                    >
                      <option value="Ela Nguema">Ela Nguema</option>
                      <option value="Buena Esperanza">Buena Esperanza</option>
                      <option value="Caracolas">Caracolas</option>
                      <option value="Los Ángeles">Los Ángeles</option>
                      <option value="El Paraíso">El Paraíso</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Scanner Block of AI Prescription OCR */}
              <div className="bg-gradient-to-r from-brand-600 to-stone-700 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
                <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-white/15 to-transparent pointer-events-none" />
                <div className="max-w-xl space-y-3 relative z-10">
                  <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-[10px] font-mono font-bold uppercase tracking-wider py-1 px-2.5 rounded-full">
                    <Sparkles size={11} className="animate-pulse" />
                    <span>Novedad Watafol</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-serif font-bold italic leading-tight">{t.recipeTitle}</h3>
                  <p className="text-neutral-100 text-xs leading-relaxed">
                    {t.recipeDesc}
                  </p>

                  <div className="bg-white/10 backdrop-blur-xs rounded-xl p-4 border border-white/10 space-y-3">
                    <p className="text-[11px] font-mono text-neutral-100 uppercase tracking-widest font-bold">Escoger Caso Demostrativo</p>
                    <div className="flex flex-wrap gap-2">
                       {samplePrescriptions.map((sample, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedSampleRecipeIdx(idx);
                            setCustomFileMockText(sample.raw_text);
                          }}
                          className={`text-left text-[11px] py-1.5 px-3 rounded-lg border font-medium cursor-pointer transition-colors ${
                            selectedSampleRecipeIdx === idx 
                              ? 'bg-white text-brand-700 border-white font-semibold' 
                              : 'bg-white/10 text-neutral-105 border-white/10 hover:bg-white/20'
                          }`}
                        >
                          {sample.name}
                        </button>
                      ))}
                    </div>

                    {/* Simulation Mock Upload area */}
                    <div className="flex items-center gap-3 bg-black/10 rounded-lg p-2.5">
                      <div className="w-10 h-10 bg-brand-700 rounded-lg flex items-center justify-center text-neutral-200 border border-white/20">
                        <Camera size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] block text-neutral-200 font-mono uppercase font-bold">O tomar foto real</span>
                        <input
                          type="text"
                          value={customFileMockText}
                          onChange={(e) => {
                            setCustomFileMockText(e.target.value);
                            setSelectedSampleRecipeIdx(-1);
                          }}
                          placeholder="Tomar foto o escribir texto de receta..."
                          className="bg-transparent text-xs text-white placeholder-neutral-200 border-none outline-hidden p-0 w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={analyzeMedicalRecipe}
                    className="bg-accent-500 hover:bg-accent-600 text-white font-serif font-semibold text-xs py-2.5 px-5 rounded-xl cursor-pointer shadow-sm transition-all flex items-center gap-2"
                    disabled={isRecipeScanning}
                  >
                    {isRecipeScanning ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Escaneando receta médica por IA...</span>
                      </>
                    ) : (
                      <>
                        <span>{t.analyzeBtn}</span>
                        <ChevronRight size={13} />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Categories Navigation Indicator Row */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 font-mono">Categorías de Inventario</h3>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'all', label: t.all, icon: Database, color: 'border-brand-200 text-stone-700 bg-brand-50' },
                    { id: 'alimentacion', label: t.alimentacion, icon: ShoppingBag, color: 'border-brand-200 text-stone-700 bg-brand-50' },
                    { id: 'farmacia', label: t.farmacia, icon: Building, color: 'border-brand-200 text-stone-700 bg-brand-50' },
                    { id: 'higiene', label: t.higiene, icon: Smartphone, color: 'border-brand-200 text-stone-700 bg-brand-50' }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedCategory === cat.id 
                          ? 'border-brand-600 bg-brand-200 text-brand-800 scale-[1.02] shadow-xs' 
                          : 'border-neutral-200 hover:border-neutral-300 text-stone-600 bg-white'
                      }`}
                    >
                      <cat.icon className="mb-1" size={18} />
                      <span className="text-xs font-serif font-bold tracking-tight">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* IA prescription results filter banner */}
              {scanResultMedicines.length > 0 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-600" size={16} />
                    <span className="text-xs text-emerald-800">
                      <strong>IA Extrajo:</strong> {scanResultMedicines.length} medicamentos en receta. Busca farmacias con stock inmediato.
                    </span>
                  </div>
                  <button
                    onClick={() => setScanResultMedicines([])}
                    className="text-xs text-neutral-500 hover:text-neutral-800 underline cursor-pointer"
                  >
                    Cerrar Receta
                  </button>
                </div>
              )}

              {/* Main Products Grid with Price Comparador Trigger */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 font-mono">Buscador Inteligente de Inventario</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {getSearchedProducts().map(prod => {
                    const matchedAlternativeShops = getFilteredShopsForProduct(prod.id);
                    const bestPrice = matchedAlternativeShops.length > 0 ? matchedAlternativeShops[0].price : null;

                    return (
                      <div key={prod.id} className="bg-white rounded-xl border border-neutral-200/80 hover:border-brand-300 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                        <div>
                          {/* Data saver compression effect */}
                          {!dataSaver ? (
                            <img
                              src={prod.image_url}
                              alt={prod.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-36 object-cover"
                            />
                          ) : (
                            <div className="w-full h-12 bg-neutral-100 flex items-center justify-center border-b border-neutral-100">
                              <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">Data-Saver Compress Active</span>
                            </div>
                          )}

                          <div className="p-4 space-y-1">
                            <span className={`text-[9px] uppercase font-mono tracking-widest font-bold px-2 py-0.5 rounded-full ${
                              prod.category === 'farmacia' || prod.category === 'medicamentos'
                                ? 'bg-accent-100 text-accent-700' 
                                : prod.category === 'alimentacion' 
                                ? 'bg-brand-100 text-brand-700' 
                                : 'bg-stone-200 text-stone-700'
                            }`}>
                              {prod.category}
                            </span>
                            <h4 className="text-sm font-serif font-bold text-stone-900 leading-tight mt-1">{prod.name}</h4>
                            <p className="text-[11px] text-stone-500 line-clamp-2">{prod.description}</p>
                          </div>
                        </div>

                        {/* Comparador & Proximity Trigger segment */}
                        <div className="p-4 border-t border-neutral-100 bg-neutral-50/50 space-y-3">
                          {matchedAlternativeShops.length > 0 ? (
                            <div className="space-y-1">
                              <span className="text-[10px] text-neutral-400 block font-mono">Punto físico más barato:</span>
                              <div className="flex items-baseline justify-between">
                                <span className="font-mono text-xs font-bold text-neutral-800">{bestPrice} XAF</span>
                                <span className="text-[10px] text-brand-600 font-mono">({matchedAlternativeShops.length} locales)</span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-[10px] text-neutral-400 block italic">Sin stock local en este barrio</span>
                          )}

                          <button
                            onClick={() => {
                              setSelectedProduct(prod);
                              setCurrentView('product-detail');
                            }}
                            className="w-full py-2 bg-brand-100 hover:bg-brand-600 hover:text-white text-brand-800 rounded-lg text-xs font-serif font-semibold cursor-pointer transition-all text-center block border border-brand-200"
                          >
                            Comparar Precios y Reservar
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {getSearchedProducts().length === 0 && (
                    <div className="col-span-full bg-white rounded-xl py-12 px-4 border border-dashed border-neutral-200 text-center">
                      <AlertTriangle className="text-neutral-300 mx-auto mb-2" size={32} />
                      <p className="text-sm text-neutral-500">{t.noResults}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Merchants Listing Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 font-mono">Abacerías y Farmacias del Barrio</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {merchants.map(merchant => {
                    const distance = calculateDistance(userLat, userLng, merchant.lat, merchant.lng);
                    
                    return (
                      <div key={merchant.id} className="bg-white rounded-xl border border-neutral-200 p-4 space-y-3 flex flex-col justify-between hover:border-brand-300 transition-colors">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-sm font-serif font-bold text-stone-900 group-hover:text-brand-600 flex items-center gap-1.5 leading-tight">
                                {merchant.name}
                                {merchant.is_verified && (
                                  <ShieldCheck size={14} className="text-[#D97757] fill-[#FAF0EB]" />
                                )}
                              </h4>
                              <p className="text-[10px] text-stone-500 mt-0.5">{merchant.barrio} • {merchant.type === 'farmacia' ? 'Farmacia' : 'Abacería'}</p>
                            </div>
                            
                            {/* Proximity and sponsored badges */}
                            <div className="text-right">
                              {merchant.is_sponsored && (
                                <span className="bg-brand-50 text-brand-800 text-[8px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full block mb-1">
                                  {t.sponsored}
                                </span>
                              )}
                              <span className="text-[10px] font-mono text-neutral-500 block">
                                {distance} km
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <span key={s} className={`text-xs ${s <= (merchant.rating || 4) ? 'text-amber-400' : 'text-neutral-200'}`}>★</span>
                            ))}
                            <span className="text-[9px] text-neutral-400 ml-1">({merchant.rating || 4.2})</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedMerchant(merchant);
                            setCurrentView('merchant-profile');
                          }}
                          className="w-full bg-neutral-100 hover:bg-white text-neutral-800 border border-neutral-200 hover:border-brand-500 rounded-lg text-xs font-semibold py-2 cursor-pointer transition-all text-center block"
                        >
                          Ver Tienda e Inventario
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* PRODUCT DETAIL VIEW (Price comparator screen) */}
          {currentView === 'product-detail' && selectedProduct && (
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-6"
            >
              <button
                onClick={() => setCurrentView('home')}
                className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 text-xs font-bold cursor-pointer font-mono"
              >
                <ArrowLeft size={14} />
                <span>Volver a Inicio</span>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs">
                {/* Images and data-saver display */}
                {!dataSaver ? (
                  <img
                    src={selectedProduct.image_url}
                    alt={selectedProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-64 object-cover rounded-xl border border-neutral-100"
                  />
                ) : (
                  <div className="w-full h-24 bg-neutral-50 border border-dashed rounded-xl flex items-center justify-center">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Data-Saver compression enabled</span>
                  </div>
                )}

                <div className="flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="bg-brand-50 text-brand-800 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase">
                      {selectedProduct.category}
                    </span>
                    <h2 className="text-xl font-bold text-neutral-900 mt-2">{selectedProduct.name}</h2>
                    <p className="text-neutral-500 text-xs leading-relaxed">{selectedProduct.description}</p>
                  </div>

                  <div className="bg-brand-50/50 rounded-xl p-4 border border-brand-100 text-neutral-700 text-xs space-y-1 flex items-center gap-3">
                    <Info size={16} className="text-brand-600 flex-shrink-0" />
                    <p>
                      {t.priceParity}
                    </p>
                  </div>
                </div>
              </div>

              {/* Price Comparador results order filters */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 border-b border-neutral-200 pb-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 font-mono">
                    {t.alternativeShops}
                  </h3>
                  
                  <div className="flex gap-2 bg-neutral-100 p-1 rounded-lg">
                    <button
                      onClick={() => setRankingFilter('closest')}
                      className={`text-[10px] font-bold px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                        rankingFilter === 'closest' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
                      }`}
                    >
                      {t.closest}
                    </button>
                    <button
                      onClick={() => setRankingFilter('economical')}
                      className={`text-[10px] font-bold px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                        rankingFilter === 'economical' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
                      }`}
                    >
                      {t.economical}
                    </button>
                  </div>
                </div>

                {/* Comparator specific list */}
                <div className="space-y-3">
                  {getFilteredShopsForProduct(selectedProduct.id).map(shop => (
                    <div key={shop.id} className="bg-white rounded-xl border border-neutral-200/80 hover:border-neutral-300 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-neutral-900">{shop.name}</h4>
                          {shop.is_verified && (
                            <ShieldCheck size={14} className="text-emerald-600 fill-emerald-100" />
                          )}
                        </div>
                        <p className="text-[10px] text-neutral-400">
                          {shop.barrio} • Presiona para ver dirección física • <strong>{shop.distance} km de ti</strong>
                        </p>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                        <div className="text-right">
                          <span className="font-mono text-sm font-bold text-neutral-900">{shop.price} XAF</span>
                          <span className="text-[8px] block text-green-600 font-mono uppercase tracking-wider font-bold">Paridad Web-Local</span>
                        </div>

                        <button
                          onClick={() => {
                            handleAddToCart(selectedProduct, shop, shop.price);
                            setCurrentView('checkout');
                          }}
                          className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold py-2 px-4 rounded-lg cursor-pointer shadow-sm transition-colors"
                        >
                          Apartar y Guardar Ticket
                        </button>
                      </div>
                    </div>
                  ))}
                  {getFilteredShopsForProduct(selectedProduct.id).length === 0 && (
                    <div className="bg-white rounded-xl py-8 px-4 border border-dashed border-neutral-200 text-center space-y-3">
                      <AlertTriangle className="text-neutral-300 mx-auto" size={24} />
                      <p className="text-xs text-neutral-500">Este producto se encuentra agotado temporalmente en este barrio.</p>
                      
                      {/* Substitutos Sugeridos engine */}
                      <div className="max-w-md mx-auto bg-neutral-50 rounded-lg p-3 text-left border border-neutral-100">
                        <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-amber-600 block mb-1">
                          {t.substituteSuggested}
                        </span>
                        <p className="text-[11px] text-neutral-600 leading-normal">
                          Te sugerimos consultar marcas alternativas del principio activo or visitando la <strong>Farmacia Ela Nguema</strong>.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* MERCHANT PROFILE VIEW */}
          {currentView === 'merchant-profile' && selectedMerchant && (
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-6"
            >
              <button
                onClick={() => setCurrentView('home')}
                className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 text-xs font-bold cursor-pointer font-mono"
              >
                <ArrowLeft size={14} />
                <span>Volver a Inicio</span>
              </button>

              {/* Merchant header */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-neutral-900">{selectedMerchant.name}</h2>
                      {selectedMerchant.is_verified && (
                        <span className="bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold py-0.5 px-2.5 rounded-full flex items-center gap-1 border border-emerald-100">
                          <ShieldCheck size={11} className="fill-emerald-100 text-emerald-700" />
                          <span>{t.verified}</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500">{selectedMerchant.barrio} • {selectedMerchant.type === 'farmacia' ? 'Farmacia de Guardia' : 'Abacería Comunitaria'}</p>
                    <p className="text-[11px] text-neutral-400 font-mono uppercase font-bold">NÚMERO VENTA: {selectedMerchant.whatsapp_number || 'No vinculado'}</p>
                  </div>

                  <div className="bg-[#FAF9F5] border border-neutral-200.5 rounded-xl p-3.5 space-y-1 font-mono text-xs w-full md:w-auto">
                    <p className="font-bold mb-1">Coordenadas Recogida:</p>
                    <p className="text-neutral-600">Latitud: {selectedMerchant.lat}</p>
                    <p className="text-neutral-600">Longitud: {selectedMerchant.lng}</p>
                  </div>
                </div>

                {/* Sello photo verification professional premium */}
                {selectedMerchant.is_verified && selectedMerchant.local_photos && selectedMerchant.local_photos.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase font-mono text-neutral-400 tracking-wider font-bold">Galería Profesional Watafol</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <img
                        src={selectedMerchant.local_photos[0]}
                        alt="Local comercial verificado"
                        referrerPolicy="no-referrer"
                        className="w-full h-40 object-cover rounded-xl border border-neutral-200"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Inventario Management panel specific for this merchant */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 font-mono">Fichas de Productos Disponibles</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map(prod => {
                    const invItem = inventories.find(
                      item => item.merchant_id === selectedMerchant.id && item.product_id === prod.id
                    );
                    
                    // Show in inventory if the merchant was claiming to set it
                    if (!invItem) return null;

                    return (
                      <div key={prod.id} className="bg-white rounded-xl border border-neutral-200/80 p-4 flex justify-between items-center shadow-xs">
                        <div className="flex items-center gap-3">
                          {!dataSaver ? (
                            <img
                              src={prod.image_url}
                              alt={prod.name}
                              referrerPolicy="no-referrer"
                              className="w-12 h-12 rounded-lg object-cover border border-neutral-100"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded bg-neutral-100 flex items-center justify-center font-mono">輕</div>
                          )}
                          <div className="space-y-0.5">
                            <h4 className="text-xs font-bold text-neutral-800">{prod.name}</h4>
                            <span className={`text-[9px] uppercase font-mono font-bold px-1.5 py-0.2 rounded-full ${
                              invItem.is_available ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                            }`}>
                              {invItem.is_available ? t.available : t.outOfStock}
                            </span>
                          </div>
                        </div>

                        <div className="text-right space-y-2">
                          <div className="font-mono text-xs font-bold text-neutral-900">{invItem.price} XAF</div>
                          <button
                            onClick={() => handleAddToCart(prod, selectedMerchant, invItem.price)}
                            className="bg-brand-600 hover:bg-brand-700 text-white font-semibold text-[11px] py-1.5 px-3 rounded-lg cursor-pointer shadow-xs transition-colors"
                            disabled={!invItem.is_available}
                          >
                            Pedir unidad
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* CHECKOUT SCREEN (Generating Ticket + captured unique phone accounts) */}
          {currentView === 'checkout' && (
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-6"
            >
              <button
                onClick={() => setCurrentView('home')}
                className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 text-xs font-bold cursor-pointer font-mono"
              >
                <ArrowLeft size={14} />
                <span>Volver a Inicio</span>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                
                {/* Cart layout detail */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 font-mono flex items-center gap-2">
                    <ShoppingBag size={16} className="text-brand-600" />
                    <span>Resumen del Pedido</span>
                  </h3>

                  <div className="divide-y divide-neutral-100">
                    {cart.map((item, index) => (
                      <div key={index} className="py-3.5 flex justify-between items-center">
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold text-neutral-800">{item.product.name}</h4>
                          <p className="text-[10px] text-neutral-400">{item.merchant.name} ({item.merchant.barrio})</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 bg-neutral-100 rounded-lg p-0.5 border border-neutral-200">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.merchant.id, -1)}
                              className="p-1 text-neutral-500 hover:text-neutral-900 cursor-pointer"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="font-mono text-xs font-bold px-1">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.merchant.id, 1)}
                              className="p-1 text-neutral-500 hover:text-neutral-900 cursor-pointer"
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                          <span className="font-mono text-xs font-bold text-neutral-900 min-w-16 text-right">
                            {item.price * item.quantity} XAF
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-neutral-200 flex justify-between items-center font-bold text-neutral-900">
                    <span className="text-xs">TOTAL ESTIMADO (XAF):</span>
                    <span className="font-mono text-lg">{getCartTotal()} XAF</span>
                  </div>
                </div>

                {/* Account details validation */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-neutral-900">{t.silentRegisterTitle}</h3>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      {t.silentRegisterDesc}
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const fd = new FormData(e.currentTarget);
                      const phoneVal = fd.get('phone') as string;
                      const nameVal = fd.get('name') as string;
                      if (!phoneVal || !nameVal) return;
                      submitReservation(phoneVal, nameVal);
                    }}
                    className="space-y-4"
                  >
                    <div className="space-y-1">
                      <label className="text-xs text-neutral-500 font-mono uppercase font-bold">{t.customerName}</label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={currentUser?.name || ''}
                        required
                        placeholder="ej. Manuel Obiang"
                        className="w-full bg-neutral-50 text-neutral-900 border border-neutral-200 focus:border-brand-500 py-2.5 px-3 rounded-lg outline-hidden text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-neutral-500 font-mono uppercase font-bold">{t.customerPhone}</label>
                      <input
                        type="text"
                        name="phone"
                        defaultValue={currentUser?.id || ''}
                        required
                        placeholder="ej. +240222000000"
                        className="w-full bg-neutral-50 text-neutral-900 border border-neutral-200 focus:border-brand-500 py-2.5 px-3 rounded-lg outline-hidden text-xs font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={cart.length === 0}
                      className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-4 rounded-xl text-xs cursor-pointer shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      <Smartphone size={15} />
                      <span>{t.sendWhatsAppBtn}</span>
                    </button>
                  </form>
                </div>

              </div>
            </motion.div>
          )}

          {/* USER TICKETS HISTORY */}
          {currentView === 'user-dashboard' && (
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-6"
            >
              <button
                onClick={() => setCurrentView('home')}
                className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 text-xs font-bold cursor-pointer font-mono"
              >
                <ArrowLeft size={14} />
                <span>Volver a Inicio</span>
              </button>

              <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-4">
                <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                  <User size={18} className="text-brand-600" />
                  <span>{t.orderHistory}</span>
                </h2>

                {currentUser ? (
                  <div className="space-y-4">
                    <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-150 text-xs flex justify-between items-center">
                      <div>
                        <p className="font-bold text-neutral-800">Perfil: {currentUser.name}</p>
                        <p className="text-neutral-400 font-mono mt-0.5">Identificador Cuenta: {currentUser.id}</p>
                      </div>
                      <span className="bg-brand-100 text-brand-800 font-bold px-2 py-0.5 rounded text-[10px] uppercase font-mono">Silencioso</span>
                    </div>

                    {/* History state simulation fetches */}
                    <div className="space-y-3">
                      {tickets.length > 0 ? (
                        tickets.filter(t => t.user_id === currentUser.id).map(ticket => (
                          <div key={ticket.id} className="bg-white border rounded-xl p-4 space-y-3 shadow-xs">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="bg-neutral-100 text-neutral-700 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                                  {ticket.id}
                                </span>
                                <h4 className="text-xs font-bold text-neutral-900 mt-1">{ticket.merchant_name}</h4>
                              </div>
                              <span className={`text-[10px] font-mono font-bold uppercase tracking-wider py-0.5 px-2.5 rounded-full ${
                                ticket.status === 'atendido' 
                                  ? 'bg-green-100 text-green-800' 
                                  : ticket.status === 'incidencia'
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {ticket.status}
                              </span>
                            </div>

                            <div className="divide-y divide-neutral-100 text-xs text-neutral-600">
                              {ticket.products.map((p, idx) => (
                                <div key={idx} className="py-1 flex justify-between">
                                  <span>{p.name} (x{p.quantity})</span>
                                  <span>{p.price * p.quantity} XAF</span>
                                </div>
                              ))}
                            </div>

                            <div className="flex justify-between items-center pt-2 border-t border-neutral-50">
                              <span className="text-xs font-bold text-neutral-900">Total: {ticket.total_price} XAF</span>
                              
                              {ticket.status === 'pendiente' && (
                                <div className="space-y-1 text-right">
                                  <button
                                    onClick={() => reportIncidence(ticket.id)}
                                    className="text-[10px] text-red-600 hover:text-red-800 font-bold underline flex items-center justify-end gap-1 cursor-pointer"
                                  >
                                    <AlertTriangle size={11} />
                                    <span>{t.incidenceBtn}</span>
                                  </button>
                                  <span className="text-[9px] text-neutral-400 block leading-tight">{t.incidenceDesc}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-neutral-400 py-4 italic text-center">No has generado ningún ticket aún en esta sesión.</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center text-neutral-400 space-y-2 border border-dashed border-neutral-200 rounded-xl">
                    <Lock size={24} className="mx-auto" />
                    <p className="text-xs">No te has registrado aún. Se creará una cuenta silenciosa automáticamente cuando envíes tu primera orden de reserva.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* SELLER MERCHANT CENTER COMPLEX DASHBOARD */}
          {currentView === 'seller-dashboard' && (
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-6"
            >
              <button
                onClick={() => setCurrentView('home')}
                className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 text-xs font-bold cursor-pointer font-mono"
              >
                <ArrowLeft size={14} />
                <span>Volver a Inicio</span>
              </button>

              {/* Main claim forms for merchant profiles */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-4">
                <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                  <Store size={18} className="text-brand-600" />
                  <span>{t.claimTitle}</span>
                </h2>
                <p className="text-xs text-neutral-400 leading-normal">
                  {t.claimDesc}
                </p>

                {claimMerchantTarget ? (
                  <form onSubmit={handleClaimSubmit} className="bg-[#FAF9F5] rounded-xl p-4 border border-neutral-250 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-neutral-950">{claimMerchantTarget.name}</h4>
                        <p className="text-[10px] text-neutral-400">{claimMerchantTarget.barrio}</p>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setClaimMerchantTarget(null)}
                        className="text-neutral-400 hover:text-neutral-600 text-xs font-bold"
                      >
                        Cambiar
                      </button>
                    </div>

                    {/* Inputs fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-mono font-bold text-neutral-400 mr-2">WhatsApp Comercial</label>
                        <input
                          type="text"
                          required
                          value={claimPhone}
                          onChange={(e) => setClaimPhone(e.target.value)}
                          placeholder="ej. +240222000000"
                          className="w-full bg-white text-neutral-900 border border-neutral-200 py-2 px-3 rounded-lg outline-hidden text-xs font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-mono font-bold text-neutral-400 mr-2">DIP Fiscal (Nacionalidad)</label>
                        <input
                          type="text"
                          placeholder="ej. DIP-984214-GE"
                          value={sellerDIPFile}
                          onChange={(e) => setSellerDIPFile(e.target.value)}
                          className="w-full bg-white text-neutral-900 border border-neutral-200 py-2 px-3 rounded-lg outline-hidden text-xs font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 bg-white rounded-lg p-3 border">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">Paso 2: Confirmar GPS Local</span>
                        <p className="text-[11px] text-neutral-600 font-mono">Pisa estando físicamente en el local</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          requestGPSLoc();
                          setClaimGPSLocked(true);
                        }}
                        className={`text-xs py-2 px-4 rounded-lg font-semibold cursor-pointer ${
                          claimGPSLocked ? 'bg-green-100 text-green-800' : 'bg-brand-600 text-white hover:bg-brand-700'
                        }`}
                      >
                        {claimGPSLocked ? '📍 Ubicación GPS Confirmada' : t.gpsConfirm}
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={!claimPhone}
                      className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer shadow-sm transition-all"
                    >
                      Completar Registro y Activar en Buscador
                    </button>
                  </form>
                ) : (
                  <div className="space-y-3">
                    <span className="text-xs text-neutral-400 block font-mono">Tiendas registradas por crawler listas para reclamación:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {merchants.filter(m => !m.is_claimed).map(m => (
                        <div key={m.id} className="bg-neutral-50/50 hover:bg-neutral-50 rounded-xl p-4 border border-neutral-200 flex justify-between items-center">
                          <div>
                            <h4 className="text-xs font-bold text-neutral-950">{m.name}</h4>
                            <p className="text-[10px] text-neutral-400">{m.barrio} • {m.type === 'farmacia' ? 'Farmacia' : 'Abacería'}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setClaimMerchantTarget(m);
                              setSelectedNeighborhood(m.barrio);
                            }}
                            className="bg-brand-100 text-brand-800 hover:bg-brand-200 text-[10px] font-bold px-3 py-1.5 rounded-lg cursor-pointer font-mono"
                          >
                            Reclamar
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Botón de Pánico STOCK SWITCH PANEL */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 font-mono">
                    {t.panicButton}
                  </h3>
                  <div className="text-right">
                    <span className="bg-amber-100 text-amber-800 font-mono text-[9px] font-bold py-0.5 px-2 rounded-full uppercase tracking-wider">
                      One-Hand Friendly
                    </span>
                  </div>
                </div>

                {/* Simulated merchant profile to demonstrate stock switch */}
                <div className="bg-[#FAF9F5] p-3 rounded-xl border mb-2 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold">Sesión: Don Manuel (Los Ángeles)</p>
                    <p className="text-neutral-400">ID: m1</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold py-0.5 px-2.5 rounded-full uppercase">Activo</span>
                </div>

                <div className="divide-y divide-neutral-100">
                  {products.map(prod => {
                    const invItem = inventories.find(
                      item => item.merchant_id === 'm1' && item.product_id === prod.id
                    );

                    if (!invItem) return null;

                    return (
                      <div key={prod.id} className="py-3 flex justify-between items-center">
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold text-neutral-900">{prod.name}</h4>
                          <span className="text-[10px] text-neutral-400 font-mono">Precio: {invItem.price} XAF</span>
                        </div>

                        {/* Large tap visual switch / Botón de pánico */}
                        <button
                          onClick={() => toggleSellerAvailability('m1', prod.id, !invItem.is_available)}
                          className={`w-28 py-2 rounded-xl text-center text-xs font-bold cursor-pointer transition-all shadow-sm ${
                            invItem.is_available 
                              ? 'bg-emerald-600 text-white' 
                              : 'bg-red-100 text-red-700 border border-red-200'
                          }`}
                        >
                          {invItem.is_available ? t.available : t.outOfStock}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Validation Field Code to maintain visibility score */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 font-mono">
                  {t.validationTitle}
                </h3>
                <p className="text-xs text-neutral-400 leading-normal">
                  Ingresa el código del Ticket Digital cuando el cliente llegue a recoger su pedido. Esto incrementará tu ranking GPS.
                </p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={validationCode}
                    onChange={(e) => setValidationCode(e.target.value)}
                    placeholder={t.validationPlaceholder}
                    className="w-full bg-neutral-50 border text-neutral-900 focus:border-brand-500 rounded-lg p-2.5 text-xs font-mono"
                  />
                  <button
                    onClick={validateCodeFn}
                    className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold py-2.5 px-4 rounded-lg cursor-pointer"
                  >
                    {t.verifyBtn}
                  </button>
                </div>
                {validationMessage && (
                  <p className="text-xs font-mono font-medium text-emerald-800 bg-emerald-50 p-2.5 rounded-lg">
                    {validationMessage}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* ADMINISTRATOR & DEVELOPER CONTROL HUB VIEW */}
          {currentView === 'admin-dashboard' && (
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-6"
            >
              {/* Back breadcrumb */}
              <button
                onClick={() => setCurrentView('home')}
                className="flex items-center gap-1.5 text-stone-500 hover:text-stone-900 text-xs font-bold cursor-pointer font-mono"
              >
                <ArrowLeft size={14} />
                <span>Volver a Inicio</span>
              </button>

              {/* Title Header */}
              <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 border border-stone-850 relative overflow-hidden shadow-lg">
                <div className="absolute right-0 bottom-0 top-0 w-2/5 bg-gradient-to-l from-brand-600/25 to-transparent pointer-events-none" />
                <div className="relative z-10 space-y-2">
                  <div className="inline-flex items-center gap-1.5 bg-brand-500/20 border border-brand-500/30 text-brand-300 text-[10px] font-mono font-bold uppercase tracking-wider py-1 px-2.5 rounded-full">
                    <SlidersHorizontal size={11} />
                    <span>Estación de Control ADM & DEV</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-serif font-bold italic tracking-tight text-white">
                    Simulador del Sistema Watafol
                  </h2>
                  <p className="text-xs text-stone-400 max-w-2xl leading-relaxed">
                    Panel interactivo de soporte y desarrollo. Monitoriza los estados físicos de la base de datos local persistida, depura reglas de SEO/rankings y ejecuta el Web Crawler que indexa comercios informales de Guinea Ecuatorial.
                  </p>
                </div>
              </div>

              {/* Tab Selector inside Admin Dashboard */}
              <div className="flex border-b border-stone-200">
                <button
                  onClick={() => setAdminActiveTab('simulation')}
                  className={`py-3 px-4 text-xs font-mono font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                    adminActiveTab === 'simulation'
                      ? 'border-brand-600 text-brand-700'
                      : 'border-transparent text-stone-500 hover:text-stone-950'
                  }`}
                >
                  <Sparkles size={14} />
                  <span>SIMULADOR Y CRAWLER</span>
                </button>

                <button
                  onClick={() => setAdminActiveTab('db-inspector')}
                  className={`py-3 px-4 text-xs font-mono font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                    adminActiveTab === 'db-inspector'
                      ? 'border-brand-600 text-brand-700'
                      : 'border-transparent text-stone-500 hover:text-stone-950'
                  }`}
                >
                  <Database size={14} />
                  <span>INSPECTOR EN VIVO (JSON)</span>
                </button>

                <button
                  onClick={() => setAdminActiveTab('visibility-rules')}
                  className={`py-3 px-4 text-xs font-mono font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                    adminActiveTab === 'visibility-rules'
                      ? 'border-brand-600 text-brand-700'
                      : 'border-transparent text-stone-500 hover:text-stone-950'
                  }`}
                >
                  <Flame size={14} />
                  <span>MÉTRICA DE VISIBILIDAD & LOGS</span>
                </button>
              </div>

              {/* SUB TAB VIEWS CONTAINER */}
              <AnimatePresence mode="wait">
                {/* 1. SIMULATION TAB */}
                {adminActiveTab === 'simulation' && (
                  <motion.div
                    key="sim-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {/* Left: Device emulation */}
                    <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-5 shadow-xs">
                      <div className="border-b pb-3 border-stone-100 flex items-center gap-2">
                        <Wifi size={16} className="text-brand-600" />
                        <h3 className="text-sm font-bold text-stone-900 font-serif">Entorno de Conectividad & Datos</h3>
                      </div>

                      <div className="space-y-4 text-xs">
                        {/* Simulation Toggle card */}
                        <div className="bg-stone-50/50 p-4 rounded-xl border border-stone-100 space-y-3">
                          <div className="flex justify-between items-center column-gap-3">
                            <div>
                              <p className="font-semibold text-stone-900">Simulación Modo Desconectado (Offline)</p>
                              <p className="text-[10px] text-stone-500 mt-0.5">Permite apartar productos y simular colas de reserva en la memoria del navegador.</p>
                            </div>
                            <button
                              onClick={() => setIsOffline(!isOffline)}
                              className={`py-1.5 px-3 rounded-lg font-mono text-[10px] text-center font-bold tracking-tight cursor-pointer ${
                                isOffline ? 'bg-amber-100 text-amber-805 border border-amber-300' : 'bg-green-100 text-green-805 border border-green-200'
                              }`}
                            >
                              {isOffline ? 'MODO OFFLINE' : 'MODO ONLINE'}
                            </button>
                          </div>
                        </div>

                        {/* Data Saver Mode toggle */}
                        <div className="bg-stone-50/50 p-4 rounded-xl border border-stone-100 space-y-3">
                          <div className="flex justify-between items-center column-gap-3">
                            <div>
                              <p className="font-semibold text-stone-900">Modo Ahorro de Megabytes (Data-Saver)</p>
                              <p className="text-[10px] text-stone-500 mt-0.5">Optimiza las peticiones de red sustituyendo imágenes reales pesadas por layouts ultraligeros de sola lectura.</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={dataSaver}
                              onChange={(e) => setDataSaver(e.target.checked)}
                              className="rounded accent-brand-600 w-4.5 h-4.5 text-brand-600 border-stone-300"
                            />
                          </div>
                        </div>

                        {/* Local Storage details */}
                        <div className="space-y-2 pt-2 border-t">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 block">Colas de Fondo Pendientes:</span>
                          <div className="grid grid-cols-2 gap-3 text-stone-600">
                            <div className="bg-stone-50 p-3 rounded-xl border flex items-center justify-between">
                              <div>
                                <p className="text-[9px] font-mono text-stone-400 font-semibold">Cambios Stock Offline</p>
                                <p className="text-sm font-bold font-mono text-stone-800">{unsyncedStockChanges.length}</p>
                              </div>
                              <WifiOff size={14} className="text-stone-400" />
                            </div>
                            <div className="bg-stone-50 p-3 rounded-xl border flex items-center justify-between">
                              <div>
                                <p className="text-[9px] font-mono text-stone-400 font-semibold">Tickets por Sincronizar</p>
                                <p className="text-sm font-bold font-mono text-stone-800">{unsyncedTickets.length}</p>
                              </div>
                              <Smartphone size={14} className="text-stone-400" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Web Crawler Simulations */}
                    <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-5 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="border-b pb-3 border-stone-100 flex items-center gap-2">
                          <Globe size={16} className="text-brand-600" />
                          <h3 className="text-sm font-bold text-stone-900 font-serif">Simulación del Web Crawler</h3>
                        </div>

                        <div className="space-y-3 text-xs text-stone-600 mt-4 leading-relaxed">
                          <p>
                            Watafol utiliza rastreadores web periódicos para buscar tiendas informales o farmacias locales que no poseen presencia digital. Estos se insertan en la base de datos con un <strong>Sello No Reclamado</strong> y sin número de WhatsApp de venta directa.
                          </p>
                          <p>
                            Al ejecutar el Crawler, el simulador buscará nuevas coordenadas físicas sobre el mapa de Malabo (por debajo de un radio aleatorio) y registrará de forma automatizada un nuevo comercio informal simulado y listo para que un tendero pise el botón "Reclamar tienda" en el Portal de Comercios.
                          </p>

                          {crawlerLog && (
                            <div className="bg-stone-50 border border-stone-200 rounded-lg p-3 font-mono text-[10px] leading-relaxed text-stone-800">
                              {crawlerLog}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-4 border-t flex gap-2">
                        <button
                          onClick={triggerDatabaseReset}
                          className="px-3 py-2 border border-red-200 text-red-600 hover:bg-red-50 text-[11px] font-semibold rounded-lg font-sans flex items-center gap-1 cursor-pointer transition-colors"
                          disabled={isAdminActionLoading}
                        >
                          Restablecer Datos
                        </button>
                        <button
                          onClick={triggerCrawlerSim}
                          className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-serif font-bold text-xs py-2 px-4 rounded-lg cursor-pointer flex items-center justify-center gap-2 transition-all shadow-sm"
                          disabled={isAdminActionLoading}
                        >
                          {isAdminActionLoading ? (
                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <>
                              <Sparkles size={13} />
                              <span>Ejecutar Web Crawler Rápido</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. DB INSPECTOR TAB */}
                {adminActiveTab === 'db-inspector' && (
                  <motion.div
                    key="db-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white rounded-xl border border-stone-200 p-5 space-y-4 shadow-xs"
                  >
                    <div className="flex justify-between items-center border-b pb-3 border-stone-100 flex-wrap gap-1">
                      <div className="space-y-0.5">
                        <h3 className="text-sm font-bold text-stone-900 font-serif">Inspector Raw Database</h3>
                        <p className="text-[10px] text-stone-500 font-mono">watafol_db.json en disco local</p>
                      </div>

                      <button
                        onClick={fetchAdminDB}
                        className="py-1.5 px-3 border border-stone-200 text-[11px] hover:bg-stone-50 font-mono font-medium rounded-lg cursor-pointer flex items-center gap-1.5 transition-all text-stone-600"
                      >
                        <Database size={12} />
                        <span>Refrescar Registro</span>
                      </button>
                    </div>

                    {adminDB ? (
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        {/* Summary side stats */}
                        <div className="space-y-3 lg:col-span-1">
                          <div className="bg-stone-50 border p-3 rounded-lg space-y-1">
                            <span className="text-[10px] uppercase font-mono font-bold text-stone-400">Total Comercios</span>
                            <p className="text-lg font-bold font-mono text-stone-800">{adminDB.merchants?.length || 0}</p>
                          </div>
                          <div className="bg-stone-50 border p-3 rounded-lg space-y-1">
                            <span className="text-[10px] uppercase font-mono font-bold text-stone-400">Usuarios Activos</span>
                            <p className="text-lg font-bold font-mono text-stone-800">{adminDB.users?.length || 0}</p>
                          </div>
                          <div className="bg-stone-50 border p-3 rounded-lg space-y-1">
                            <span className="text-[10px] uppercase font-mono font-bold text-stone-400">Reservas Emitidas</span>
                            <p className="text-lg font-bold font-mono text-stone-800">{adminDB.tickets?.length || 0}</p>
                          </div>
                          <div className="bg-stone-50 border p-3 rounded-lg space-y-1">
                            <span className="text-[10px] uppercase font-mono font-bold text-stone-400">Registros de Enlace</span>
                            <p className="text-lg font-bold font-mono text-stone-800">{adminDB.inventory?.length || 0}</p>
                          </div>
                        </div>

                        {/* Interactive JSON View block */}
                        <div className="lg:col-span-3 bg-stone-950 text-stone-200 rounded-xl p-4 font-mono text-[10px] leading-relaxed max-h-96 overflow-y-auto border border-stone-800 select-all shadow-inner relative">
                          <div className="absolute top-2 right-2 bg-stone-800 text-stone-300 text-[8px] font-bold px-2 py-0.5 rounded tracking-widest">
                            READONLY LIVE DB
                          </div>
                          <pre>{JSON.stringify(adminDB, null, 2)}</pre>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-stone-400 font-mono text-xs">
                        Refrescando base de datos física...
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 3. VISIBILITY RULES & ANALYTICS */}
                {adminActiveTab === 'visibility-rules' && (
                  <motion.div
                    key="rules-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white rounded-xl border border-stone-200 p-5 space-y-5 shadow-xs"
                  >
                    <div className="border-b pb-3 border-stone-100">
                      <h3 className="text-sm font-bold text-stone-900 font-serif">Algoritmo de Posicionamiento SEO & Penalizaciones</h3>
                      <p className="text-[10px] text-stone-400 mt-0.5 font-mono">Reglas fijas aplicadas a los listados de búsqueda del consumidor</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      {/* Rule item 1 */}
                      <div className="p-4 border rounded-xl space-y-2 bg-[#FBFBF9]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 bg-[#FAF0EB] text-[#D97757] font-bold font-mono text-[9px] rounded-full flex items-center justify-center">1</span>
                          <span className="font-bold text-stone-800">Sello Verificado (+15 Score)</span>
                        </div>
                        <p className="text-[11px] text-stone-600 leading-normal">
                          Cuando un tendero sube su DIP fiscal y es vetado profesionalmente, adquiere instantáneamente el Sello Verificado. Sube la prioridad de visibilidad en búsquedas superiores de manera orgánica.
                        </p>
                      </div>

                      {/* Rule item 2 */}
                      <div className="p-4 border rounded-xl space-y-2 bg-[#FBFBF9]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 bg-[#FAF0EB] text-[#D97757] font-bold font-mono text-[9px] rounded-full flex items-center justify-center">2</span>
                          <span className="font-bold text-stone-800">Ubicación GPS Dinámica</span>
                        </div>
                        <p className="text-[11px] text-stone-600 leading-normal">
                          El algoritmo calcula por geolocalización Haversine la distancia exacta entre el de navegación de la persona y la coordenadas del local. Reordena la proximidad para maximizar la velocidad de recogida física.
                        </p>
                      </div>

                      {/* Rule item 3 */}
                      <div className="p-4 border rounded-xl space-y-2 bg-red-50/50 border-red-100">
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 bg-red-100 text-red-700 font-bold font-mono text-[9px] rounded-full flex items-center justify-center">3</span>
                          <span className="font-bold text-stone-800">Penalización Incidencia (-25 Score)</span>
                        </div>
                        <p className="text-[11px] text-stone-600 leading-normal">
                          Si un usuario reporta que una abacería o farmacia tenía stock falso en Watafol (producto ya retirado o inexistente de manera física), disminuye de inmediato 25 puntos de visibilidad absoluta, enviando al local directo a la cola para proteger los megas.
                        </p>
                      </div>
                    </div>

                    {/* Interactive ratings ranking review list */}
                    <div className="space-y-3 pt-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 block">Auditoría de Visibilidad en Vivo (Scoring de Comercios):</span>
                      <div className="divide-y border rounded-xl bg-stone-50/50">
                        {merchants.map((merchant, idx) => (
                          <div key={merchant.id} className="p-3.5 flex justify-between items-center text-xs">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[10px] text-stone-400">#{idx + 1}</span>
                                <h4 className="font-bold text-stone-850">{merchant.name} ({merchant.is_claimed ? 'Reclamado' : 'No reclamado'})</h4>
                                {merchant.is_verified && (
                                  <span className="bg-orange-50 text-[#D97757] px-1.5 py-0.2 rounded font-bold text-[8px] font-mono border border-orange-200">VERIFICADO</span>
                                )}
                              </div>
                              <p className="text-[10px] text-stone-500">{merchant.barrio} • {merchant.type === 'farmacia' ? 'Farmacia' : 'Abacería'}</p>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <p className="text-[9px] font-mono text-stone-400 uppercase">Visibilidad</p>
                                <p className="font-mono text-stone-800 font-bold">{merchant.visibility_rank}%</p>
                              </div>
                              <span className={`w-3 h-3 rounded-full ${
                                merchant.visibility_rank >= 80 
                                  ? 'bg-green-500'
                                  : merchant.visibility_rank >= 50
                                  ? 'bg-amber-400'
                                  : 'bg-red-500'
                              }`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* Footer Branding Area */}
      <footer className="bg-white border-t border-neutral-100 py-6 text-center text-xs text-neutral-400">
        <p>© 2026 {t.logo} • Guinea Ecuatorial. Diseñado para un consumo ultra eficiente de megas.</p>
        <p className="mt-1 font-mono text-[10px]">PWA Lite - Offline-First Sync</p>
      </footer>
    </div>
  );
}
