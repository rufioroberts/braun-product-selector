export interface Product {
  asin: string;
  name: string;
  category: Category;
  gender: Gender;
  tier: Tier;
  series: string;
  bodyArea: string;
  features: string[];
  priceRange?: string;
}

export type Gender = 'Men' | 'Women';
export type Category = 'Electric Shaver' | 'Beard Trimmer' | 'Multi Groomer' | 'Body Groomer' | 'IPL Hair Removal' | 'Facial Care';
export type Tier = 'Premium' | 'Mid-Range' | 'Entry';

export const products: Product[] = [
  {
    asin: 'B0CKSYY3TD',
    name: 'Braun Series 8 Electric Shaver',
    category: 'Electric Shaver',
    gender: 'Men',
    tier: 'Premium',
    series: 'Series 8',
    bodyArea: 'Face',
    features: ['4+1 Shaving Head with Precision Trimmer', 'Sonic Technology 10000 micro-vibrations', '100% Waterproof Wet & Dry'],
  },
  {
    asin: 'B08M4T85GF',
    name: 'Braun Series 7 71-N1200s Mens Shaver',
    category: 'Electric Shaver',
    gender: 'Men',
    tier: 'Premium',
    series: 'Series 7',
    bodyArea: 'Face',
    features: ['360° Flex Head', 'AutoSense Technology', 'Rechargeable Cordless'],
  },
  {
    asin: 'B08M4X5VZ2',
    name: 'Braun Series 7 70-B1000s Electric Shaver',
    category: 'Electric Shaver',
    gender: 'Men',
    tier: 'Premium',
    series: 'Series 7',
    bodyArea: 'Face',
    features: ['360° Flex Head', 'EasyClick Attachments', 'Wet & Dry'],
  },
  {
    asin: 'B08M4W4VGH',
    name: 'Braun Series 6 61-R1000s Electric Shaver',
    category: 'Electric Shaver',
    gender: 'Men',
    tier: 'Mid-Range',
    series: 'Series 6',
    bodyArea: 'Face',
    features: ['SensoFlex Swivel Head', 'EasyClick Attachments', 'Wet & Dry'],
  },
  {
    asin: 'B09ZD8VT6S',
    name: 'Braun Series 5 51-M1200s Electric Shaver',
    category: 'Electric Shaver',
    gender: 'Men',
    tier: 'Mid-Range',
    series: 'Series 5',
    bodyArea: 'Face',
    features: ['EasyClick Precision Trimmer', 'AutoSense Technology', 'Rechargeable Cordless'],
  },
  {
    asin: 'B08M4RZGYW',
    name: 'Braun Series 5 50-B1000s Electric Shaver',
    category: 'Electric Shaver',
    gender: 'Men',
    tier: 'Mid-Range',
    series: 'Series 5',
    bodyArea: 'Face',
    features: ['3 Flexible Blades', 'EasyClick Attachments', 'Wet & Dry'],
  },
  {
    asin: 'B08QT8HHHN',
    name: 'Braun Series 3 ProSkin 3-Flex Electric Shaver',
    category: 'Electric Shaver',
    gender: 'Men',
    tier: 'Entry',
    series: 'Series 3',
    bodyArea: 'Face',
    features: ['3 Pressure-Sensitive Elements', 'MicroComb Technology', 'Wet & Dry'],
  },
  {
    asin: 'B08QTFWQ4R',
    name: 'Braun Series 3 Shave&Style 310BT',
    category: 'Electric Shaver',
    gender: 'Men',
    tier: 'Entry',
    series: 'Series 3',
    bodyArea: 'Face',
    features: ['3-in-1 Shave Style Trim', '5 Combs for Precision', 'Rechargeable'],
  },
  {
    asin: 'B087V7BJ6W',
    name: 'Braun Series 3 Electric Shaver',
    category: 'Electric Shaver',
    gender: 'Men',
    tier: 'Entry',
    series: 'Series 3',
    bodyArea: 'Face',
    features: ['ProSkin Technology', 'Washable', 'Rechargeable Cordless'],
  },
  {
    asin: 'B0CLD7JMZL',
    name: 'Braun BT7440 Series 7 Beard Trimmer',
    category: 'Beard Trimmer',
    gender: 'Men',
    tier: 'Premium',
    series: 'Series 7',
    bodyArea: 'Face/Beard',
    features: ['AutoSense Technology', '39 Length Settings', '100min Runtime'],
  },
  {
    asin: 'B0BVRBT6DS',
    name: 'Braun BT5440 Series 5 Beard Trimmer',
    category: 'Beard Trimmer',
    gender: 'Men',
    tier: 'Mid-Range',
    series: 'Series 5',
    bodyArea: 'Face/Beard',
    features: ['AutoSense Technology', '39 Length Settings', '100min Runtime'],
  },
  {
    asin: 'B0CLD6XTRG',
    name: 'Braun MGK7460 All-in-One Groomer',
    category: 'Multi Groomer',
    gender: 'Men',
    tier: 'Premium',
    series: 'Series 7',
    bodyArea: 'Full Body',
    features: ['10-in-1 Trimming Kit', 'AutoSense Technology', '100min Runtime'],
  },
  {
    asin: 'B0CLD7YWC8',
    name: 'Braun MGK7420 All-in-One Groomer',
    category: 'Multi Groomer',
    gender: 'Men',
    tier: 'Premium',
    series: 'Series 7',
    bodyArea: 'Full Body',
    features: ['8-in-1 Trimming Kit', 'AutoSense Technology', '100min Runtime'],
  },
  {
    asin: 'B0CLD77R4Y',
    name: 'Braun MGK5420 All-in-One Groomer',
    category: 'Multi Groomer',
    gender: 'Men',
    tier: 'Mid-Range',
    series: 'Series 5',
    bodyArea: 'Full Body',
    features: ['9-in-1 Trimming Kit', 'AutoSense Technology', '100min Runtime'],
  },
  {
    asin: 'B096C25SQ7',
    name: 'Braun XT5200 All-in-One Groomer',
    category: 'Multi Groomer',
    gender: 'Men',
    tier: 'Entry',
    series: 'XT Series',
    bodyArea: 'Full Body',
    features: ['4-in-1 Styling Tool', 'Metal Blade', 'Wet & Dry'],
  },
  {
    asin: 'B0BT557TH8',
    name: 'Braun Bodygroomer 5 BG5360',
    category: 'Body Groomer',
    gender: 'Men',
    tier: 'Mid-Range',
    series: 'Series 5',
    bodyArea: 'Body',
    features: ['SkinShield Technology', 'Gentle Grooming', 'Wet & Dry'],
  },
  {
    asin: 'B08ZJ7X8F9',
    name: 'Braun Silk-expert Pro 5 PL5157',
    category: 'IPL Hair Removal',
    gender: 'Women',
    tier: 'Premium',
    series: 'Pro 5',
    bodyArea: 'Full Body',
    features: ['Visible Hair Removal in 4 Weeks', '400000 Flashes', 'SensoAdapt Skin Sensor'],
  },
  {
    asin: 'B07N1GCPC9',
    name: 'Braun Silk-expert Pro 5 PL5157',
    category: 'IPL Hair Removal',
    gender: 'Women',
    tier: 'Premium',
    series: 'Pro 5',
    bodyArea: 'Full Body',
    features: ['Visible Hair Removal in 4 Weeks', '400000 Flashes', 'Venus Razor & Pouch Included'],
  },
  {
    asin: 'B0B87NVKF4',
    name: 'Braun Silk-expert Pro 3 PL3133',
    category: 'IPL Hair Removal',
    gender: 'Women',
    tier: 'Entry',
    series: 'Pro 3',
    bodyArea: 'Full Body',
    features: ['Compact Design', '300000 Flashes', '3 Comfort Modes'],
  },
  {
    asin: 'B077ZM2QKC',
    name: 'Braun FaceSpa SE911 Facial Epilator',
    category: 'Facial Care',
    gender: 'Women',
    tier: 'Premium',
    series: 'FaceSpa',
    bodyArea: 'Face',
    features: ['3-in-1 Facial Epilator Cleanser Toner', 'MicroVibration Head', 'Waterproof'],
  },
  {
    asin: 'B08J4NMBL2',
    name: 'Braun Face Mini Hair Remover FS1000',
    category: 'Facial Care',
    gender: 'Women',
    tier: 'Entry',
    series: 'Face Mini',
    bodyArea: 'Face',
    features: ['Gentle Facial Hair Removal', 'Built-in Smart Light', 'Compact Travel Size'],
  },
];

// Helper functions
export function getProductsByGender(gender: Gender): Product[] {
  return products.filter(p => p.gender === gender);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter(p => p.category === category);
}

export function getProductsByTier(category: Category, tier: Tier): Product[] {
  return products.filter(p => p.category === category && p.tier === tier);
}

export function getProductsBySeries(category: Category, series: string[]): Product[] {
  return products.filter(p => p.category === category && series.includes(p.series));
}

// Category counts for display
export const categoryCounts = {
  men: products.filter(p => p.gender === 'Men').length,
  women: products.filter(p => p.gender === 'Women').length,
  electricShaver: products.filter(p => p.category === 'Electric Shaver').length,
  beardTrimmer: products.filter(p => p.category === 'Beard Trimmer').length,
  multiGroomer: products.filter(p => p.category === 'Multi Groomer').length,
  bodyGroomer: products.filter(p => p.category === 'Body Groomer').length,
  iplHairRemoval: products.filter(p => p.category === 'IPL Hair Removal').length,
  facialCare: products.filter(p => p.category === 'Facial Care').length,
};
