/**
 * Service to generate realistic, location-based Mandi prices for Indian agricultural commodities.
 * Used entirely client-side without touching the backend database.
 */

export function getMandiPrice(cropName, farmLocation = "") {
  const normalizedCrop = cropName?.toLowerCase().trim() || "";
  
  // Parse location
  let mandiName = "National Average Market";
  let state = "Maharashtra"; // default
  
  if (farmLocation) {
    const parts = farmLocation.split(",").map(p => p.trim());
    if (parts.length > 0 && parts[0]) {
      mandiName = `${parts[0]} Mandi`;
    }
    if (parts.length > 1 && parts[1]) {
      state = parts[1];
    }
  }

  // Base price configurations for crops (per quintal = 100 kg)
  const basePrices = {
    wheat: { min: 2150, max: 2450, modal: 2300, unit: "Quintal", change: 1.2 },
    tomato: { min: 1800, max: 2800, modal: 2300, unit: "Quintal", change: 3.5 },
    onion: { min: 1400, max: 2200, modal: 1800, unit: "Quintal", change: -0.8 },
    rice: { min: 2000, max: 2600, modal: 2350, unit: "Quintal", change: 0.5 },
    paddy: { min: 2000, max: 2600, modal: 2350, unit: "Quintal", change: 0.5 },
    potato: { min: 1200, max: 1800, modal: 1500, unit: "Quintal", change: 1.8 },
    brinjal: { min: 1500, max: 2400, modal: 1950, unit: "Quintal", change: -2.1 },
    eggplant: { min: 1500, max: 2400, modal: 1950, unit: "Quintal", change: -2.1 },
    sugarcane: { min: 310, max: 340, modal: 325, unit: "Ton", change: 0.0 }, 
    corn: { min: 1800, max: 2200, modal: 2000, unit: "Quintal", change: 0.9 },
    maize: { min: 1800, max: 2200, modal: 2000, unit: "Quintal", change: 0.9 },
    cotton: { min: 6200, max: 7500, modal: 6850, unit: "Quintal", change: 1.4 },
    soybean: { min: 4200, max: 4800, modal: 4500, unit: "Quintal", change: -0.4 },
    default: { min: 2000, max: 3000, modal: 2500, unit: "Quintal", change: 0.0 }
  };

  const cropKey = Object.keys(basePrices).find(k => normalizedCrop.includes(k)) || "default";
  const base = basePrices[cropKey];

  // Seeded random based on cropName and farmLocation length to keep values consistent per crop/farm
  const seed = (normalizedCrop.length + mandiName.length) % 10;
  const variation = (seed - 5) * 15; // -75 to +60 rupees variation
  
  const minPrice = base.min + variation;
  const maxPrice = base.max + variation;
  const modalPrice = base.modal + variation;
  
  // Create 5-day history for the trend sparkline
  const history = [];
  const today = new Date();
  for (let i = 4; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    // Add minor daily walk
    const walk = Math.sin(i + seed) * (modalPrice * 0.025); 
    history.push({
      date: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      price: Math.round(modalPrice + walk)
    });
  }

  // Calculate final change percentage
  const changeValue = Number((base.change + (seed % 3 - 1) * 0.4).toFixed(1));

  return {
    cropName: cropName,
    mandiName,
    state,
    minPrice,
    maxPrice,
    modalPrice,
    unit: base.unit,
    change: changeValue,
    history,
    lastUpdated: "Today, 11:30 AM"
  };
}
