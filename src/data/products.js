// OLIVÉRA Curated Product Database
export const initialProducts = [
  {
    id: 'olv-001',
    name: 'Atelier French Linen Trench Coat',
    category: 'Outerwear',
    gender: 'Women',
    price: 14500,
    originalPrice: 18500,
    discount: '22% OFF',
    rating: 4.9,
    reviewsCount: 128,
    isNew: true,
    isBestSeller: true,
    isSale: true,
    tag: 'Bestseller',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Olive Green', hex: '#3A4D39' },
      { name: 'Oatmeal Cream', hex: '#ECE3CE' },
      { name: 'Warm Taupe', hex: '#A89F91' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'A masterclass in relaxed tailoring. Spun from 100% Normandy flax linen, this unstructured trench features deep patch pockets, horn buttons, and a detachable cinched sash belt.',
    details: [
      '100% Pure Normandy Flax Linen',
      'Natural corozo nut buttons',
      'Storm flap and back vent for graceful drape',
      'Dry clean or gentle cold hand wash'
    ],
    stock: 14
  },
  {
    id: 'olv-002',
    name: 'Raw Silk & Linen Kurta Co-ord',
    category: 'Co-ords',
    gender: 'Women',
    price: 12200,
    originalPrice: 15000,
    discount: '18% OFF',
    rating: 4.8,
    reviewsCount: 94,
    isNew: true,
    isBestSeller: true,
    isSale: false,
    tag: 'New In',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Cream Ivory', hex: '#F5EFE6' },
      { name: 'Forest Olive', hex: '#2A3829' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Elevated luxury meets heritage craftsmanship. Tailored straight-cut silhouette with subtle olive hand-embroidered neckline accents paired with matching culottes.',
    details: [
      'Raw Silk & Long-staple Organic Linen blend',
      'Hand-finished scalloped hemline',
      'Includes matching high-waisted relaxed culotte trousers',
      'Breathable, temperature-regulating weave'
    ],
    stock: 8
  },
  {
    id: 'olv-003',
    name: 'Men\'s Tailored Olive Safari Jacket',
    category: 'Outerwear',
    gender: 'Men',
    price: 16800,
    originalPrice: 21000,
    discount: '20% OFF',
    rating: 4.9,
    reviewsCount: 156,
    isNew: false,
    isBestSeller: true,
    isSale: true,
    tag: 'Bestseller',
    images: [
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Deep Military Olive', hex: '#34432C' },
      { name: 'Desert Khaki', hex: '#C2B69D' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'A timeless masculine staple redefined. Structured yet relaxed cotton-twill safari jacket featuring four bellows pockets, waist drawcord, and antique brass snap hardware.',
    details: [
      'Heavyweight 320 GSM washed organic cotton twill',
      'Internal hidden passport pocket',
      'Double-stitched stress points for longevity',
      'Machine wash gentle cycle'
    ],
    stock: 19
  },
  {
    id: 'olv-004',
    name: 'Ribbed Cashmere & Silk Cream Knit',
    category: 'Essentials',
    gender: 'Women',
    price: 9800,
    originalPrice: 12500,
    discount: '21% OFF',
    rating: 4.7,
    reviewsCount: 72,
    isNew: true,
    isBestSeller: false,
    isSale: true,
    tag: 'Trending',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Alabaster Cream', hex: '#FDFBF7' },
      { name: 'Sage Olive', hex: '#739072' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Cloud-soft texture with an effortless drape. Spun with ethically gathered Mongolian cashmere and mulberry silk fibers for seamless transitional layering.',
    details: [
      '70% Mongolian Cashmere, 30% Mulberry Silk',
      'Flattering ribbed mock neckline',
      'Extended cuffs with thumbhole slits',
      'Hand wash lukewarm with wool detergent'
    ],
    stock: 11
  },
  {
    id: 'olv-005',
    name: 'Men\'s Italian Linen Resort Shirt',
    category: 'Essentials',
    gender: 'Men',
    price: 7500,
    originalPrice: 9500,
    discount: '21% OFF',
    rating: 4.9,
    reviewsCount: 110,
    isNew: false,
    isBestSeller: true,
    isSale: false,
    tag: 'Bestseller',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Warm Cream', hex: '#F5EFE6' },
      { name: 'Olive Drab', hex: '#4A5B3D' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Cut with an open Cuban camp collar and breezy relaxed body. The ideal warm-weather shirt that looks sharp whether unbuttoned over a vest or paired with tailored trousers.',
    details: [
      '100% Delave Italian Linen',
      'Mother-of-pearl buttons',
      'Straight hem with side seam notches',
      'Naturally rumpled organic aesthetic'
    ],
    stock: 25
  },
  {
    id: 'olv-006',
    name: 'Elysian Pleated Olive Maxi Dress',
    category: 'Festive',
    gender: 'Women',
    price: 15400,
    originalPrice: 19800,
    discount: '22% OFF',
    rating: 5.0,
    reviewsCount: 88,
    isNew: true,
    isBestSeller: true,
    isSale: true,
    tag: 'Limited Edition',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Deep Olive', hex: '#2E3B2B' },
      { name: 'Champagne Cream', hex: '#EFE5CE' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Graceful architectural pleats flow down from a structured sweetheart bodice into a sweeping tiered silhouette. An unforgettable choice for soirées and weddings.',
    details: [
      'Silk chiffon overlay with organic cotton lining',
      'Concealed back zip with hook-and-eye closure',
      'Flowing micro-pleated skirt with 3.5m flare',
      'Dry clean only'
    ],
    stock: 6
  },
  {
    id: 'olv-007',
    name: 'Men\'s Double-Breasted Olive Linen Suit',
    category: 'Festive',
    gender: 'Men',
    price: 24500,
    originalPrice: 32000,
    discount: '23% OFF',
    rating: 4.9,
    reviewsCount: 64,
    isNew: true,
    isBestSeller: false,
    isSale: true,
    tag: 'Haute Couture',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Royal Forest Olive', hex: '#263321' },
      { name: 'Ivory Cream', hex: '#F7F3E9' }
    ],
    sizes: ['38R', '40R', '42R', '44R'],
    description: 'Sartorial excellence engineered for Mediterranean luxury. Peaked lapels, hand-stitched pick detailing, and unpadded shoulders create an effortlessly commanding profile.',
    details: [
      'Includes two-piece tailored jacket & pleated trousers',
      'Half-canvas construction with breathable cupro lining',
      'Side waist adjusters on trousers',
      'Specialist dry clean'
    ],
    stock: 5
  },
  {
    id: 'olv-008',
    name: 'Cream Relaxed Linen Wide-Leg Trousers',
    category: 'Essentials',
    gender: 'Women',
    price: 8200,
    originalPrice: 10500,
    discount: '22% OFF',
    rating: 4.8,
    reviewsCount: 142,
    isNew: false,
    isBestSeller: true,
    isSale: false,
    tag: 'Wardrobe Staple',
    images: [
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Soft Cream', hex: '#F5EFE6' },
      { name: 'Olive Sage', hex: '#5A6F56' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'The definitive wide-leg trouser. Featuring double front pleats, high-rise contoured waist, and an ultra-flattering elongated drape that moves with you.',
    details: [
      '100% Pre-washed organic linen',
      'Elasticated back waistband for supreme comfort',
      'Deep slash front pockets & tailored rear welt pockets',
      'Machine wash gentle'
    ],
    stock: 22
  },
  {
    id: 'olv-009',
    name: 'Verdant Artisanal Silk Scarf',
    category: 'Accessories',
    gender: 'Unisex',
    price: 4500,
    originalPrice: 6000,
    discount: '25% OFF',
    rating: 4.9,
    reviewsCount: 47,
    isNew: false,
    isBestSeller: false,
    isSale: true,
    tag: 'Handcrafted',
    images: [
      'https://images.unsplash.com/photo-1525450824786-227cbef70703?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Botanical Olive & Cream Print', hex: '#3A4D39' },
      { name: 'Gold Ochre', hex: '#D4AF37' }
    ],
    sizes: ['90 x 90 cm'],
    description: 'Hand-rolled edges printed with botanical foliage inspired by vintage herbariums. Crafted on 16mm pure silk twill with a lustrous drape and sheen.',
    details: [
      '100% Mulberry Silk Twill',
      'Hand-rolled and hand-stitched borders',
      'Arrives in gold-embossed OLIVÉRA gift box',
      'Dry clean recommended'
    ],
    stock: 30
  },
  {
    id: 'olv-010',
    name: 'Heritage Canvas & Olive Leather Tote',
    category: 'Accessories',
    gender: 'Unisex',
    price: 11200,
    originalPrice: 14000,
    discount: '20% OFF',
    rating: 4.8,
    reviewsCount: 89,
    isNew: true,
    isBestSeller: true,
    isSale: false,
    tag: 'Bestseller',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525450824786-227cbef70703?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Heavy Cream Canvas & Olive Leather', hex: '#ECE3CE' },
      { name: 'Full Olive Nubuck', hex: '#3A4D39' }
    ],
    sizes: ['One Size (42 x 34 x 16 cm)'],
    description: 'Crafted from 24oz water-resistant cotton duck canvas framed with vegetable-tanned olive pull-up leather. Fits a 16-inch laptop with room for weekend travel.',
    details: [
      'Full-grain Italian vegetable-tanned leather trim',
      'Solid brass YKK zipper and protective bottom feet',
      'Padded laptop compartment & quick-access phone sleeve',
      'Spot clean with canvas cleaner'
    ],
    stock: 15
  },
  {
    id: 'olv-011',
    name: 'Men\'s Olive Linen Gurkha Chinos',
    category: 'Essentials',
    gender: 'Men',
    price: 8900,
    originalPrice: 11500,
    discount: '22% OFF',
    rating: 4.8,
    reviewsCount: 63,
    isNew: false,
    isBestSeller: false,
    isSale: true,
    tag: 'Classic',
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Olive Green', hex: '#3A4D39' },
      { name: 'Oatmeal Khaki', hex: '#DFD7C2' }
    ],
    sizes: ['30', '32', '34', '36'],
    description: 'Inspired by traditional British military officer uniforms. Iconic high-rise double-buckle crossover waistband that eliminates the need for a belt.',
    details: [
      '60% Pure Linen, 40% Long-staple Egyptian Cotton',
      'Double forward pleats with tapered calf',
      'Twin side buckle fastenings in antiqued brass',
      'Machine wash gentle'
    ],
    stock: 18
  },
  {
    id: 'olv-012',
    name: 'Kimono Collar Olive Linen Abaya / Cardigan',
    category: 'Co-ords',
    gender: 'Women',
    price: 13900,
    originalPrice: 17500,
    discount: '20% OFF',
    rating: 5.0,
    reviewsCount: 115,
    isNew: true,
    isBestSeller: true,
    isSale: true,
    tag: 'Modest Luxe',
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Olive Verdant', hex: '#3A4D39' },
      { name: 'Cream Alabaster', hex: '#FBF9F4' }
    ],
    sizes: ['52', '54', '56', '58'],
    description: 'An ethereal layering open-front robe cut with sweeping kimono sleeves and delicate cream tone piping along the lapels. Perfect for modern modest luxury.',
    details: [
      'Pure organic washed linen with breathable drape',
      'Includes detachable belt tie and matching hijab/scarf',
      'Deep side pockets seamlessly integrated',
      'Gentle cold wash'
    ],
    stock: 10
  }
];

export const categoriesData = [
  {
    id: 'cat-women',
    name: 'Women’s Atelier',
    count: '48 Pieces',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    description: 'Graceful silhouettes in linen, raw silk, and airy knits.'
  },
  {
    id: 'cat-men',
    name: 'Men’s Sartorial',
    count: '36 Pieces',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    description: 'Precision cut safari jackets, linen shirts, and Gurkha trousers.'
  },
  {
    id: 'cat-coords',
    name: 'Linen & Co-ords',
    count: '24 Sets',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
    description: 'Effortless coordinated sets in signature olive and cream.'
  },
  {
    id: 'cat-festive',
    name: 'Festive & Formal',
    count: '18 Pieces',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80',
    description: 'Hand-detailed occasion wear infused with understated opulence.'
  }
];

export const testimonialsData = [
  {
    id: 'rev-1',
    name: 'Ayesha Khan',
    city: 'Lahore, Pakistan',
    rating: 5,
    date: '3 days ago',
    comment: 'The French Linen Trench is nothing short of breathtaking! The olive hue is so rich and unique, and the fabric drape feels like a $600 European designer coat. Shipping to Lahore was super quick within 2 days.',
    itemBought: 'Atelier French Linen Trench Coat',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-2',
    name: 'Daniyal Rehman',
    city: 'Karachi, Pakistan',
    rating: 5,
    date: '1 week ago',
    comment: 'Finally a brand that understands modern minimalism! The Men’s Safari Jacket in military olive has immaculate stitching. Heavy twill fabric with premium brass buttons. Very impressed with the packaging too.',
    itemBought: 'Men’s Tailored Olive Safari Jacket',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-3',
    name: 'Zara Malik',
    city: 'Islamabad, Pakistan',
    rating: 5,
    date: '2 weeks ago',
    comment: 'The cream and olive color combination is divine. I ordered the Raw Silk & Linen Co-ord for a family dinner and received endless compliments. Definitely my go-to luxury brand now!',
    itemBought: 'Raw Silk & Linen Kurta Co-ord',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
  }
];
