const POINTS_CONFIG = {
  postItem: 10,
  claimItem: 5,
  completePickup: 20,
  perKgRecycled: 2
};

const BADGES = [
  { 
    id: 'eco-starter', 
    name: '🌱 Eco Starter', 
    requirement: { itemsPosted: 1 } 
  },
  { 
    id: 'recycling-hero', 
    name: '♻️ Recycling Hero', 
    requirement: { itemsPosted: 10 } 
  },
  { 
    id: 'green-champion', 
    name: '🏆 Green Champion', 
    requirement: { kgRecycled: 100 } 
  },
  { 
    id: 'earth-warrior', 
    name: '🌍 Earth Warrior', 
    requirement: { itemsPosted: 50, itemsClaimed: 20 } 
  }
];

function calculatePoints(action, data = {}) {
  switch(action) {
    case 'postItem':
      return POINTS_CONFIG.postItem;
    case 'claimItem':
      return POINTS_CONFIG.claimItem;
    case 'completePickup':
      return POINTS_CONFIG.completePickup + (data.weight * POINTS_CONFIG.perKgRecycled);
    default:
      return 0;
  }
}

function checkBadges(userStats) {
  return BADGES.filter(badge => {
    return Object.entries(badge.requirement).every(([key, value]) => {
      return userStats[key] >= value;
    });
  }).map(badge => badge.name);
}

function calculateCO2Impact(weight, category) {
  const CO2_FACTORS = {
    'Plastic': 2.0,
    'E-Waste': 1.5,
    'Paper': 1.8,
    'Clothes': 2.5,
    'Metal': 3.0
  };
  
  return weight * (CO2_FACTORS[category] || 1.5);
}

module.exports = { 
  calculatePoints, 
  checkBadges, 
  calculateCO2Impact,
  BADGES
};