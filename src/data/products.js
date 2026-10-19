import { buildReviews } from './reviews'

// `image` describes the product visual: { kind, tone }. ProductImage renders a polished
// illustration from it. When the backend arrives, replace with a real image URL.
const base = [
  {
    id: 'iphone-17', name: 'iPhone 17', brand: 'Apple', category: 'electronics', subcategory: 'Smartphone',
    image: { kind: 'phone', tone: 'violet' }, price: 79999, rating: 4.7, reviewCount: 2341, trendingScore: 98,
    description: 'A 6.3-inch ProMotion display, the A19 chip and a refined dual-camera system in a lighter aluminium body.',
    insight: 'Loved for camera and speed. Battery is the most common complaint.',
    aspectRatings: { quality: 4.6, performance: 4.8, design: 4.7, durability: 4.4, value: 4.3 },
    pros: ['Excellent performance', 'Good camera', 'Premium design'], cons: ['Expensive', 'Battery could be better'],
    stores: [{ name: 'Amazon', price: 79999, url: '#' }, { name: 'Flipkart', price: 78999, url: '#' }, { name: 'Croma', price: 79900, url: '#' }],
    aiSummary: {
      summary: 'Owners describe the iPhone 17 as the most balanced iPhone in years. The smoother display and faster chip stand out in daily use, and the camera earns consistent praise in low light. Most complaints are about price and battery life under heavy use.',
      forWho: 'Good for users who prioritize performance and camera quality.',
    },
  },
  {
    id: 'macbook-air-m4', name: 'MacBook Air M4', brand: 'Apple', category: 'computers', subcategory: 'Laptop',
    image: { kind: 'laptop', tone: 'sage' }, price: 99900, rating: 4.8, reviewCount: 1824, trendingScore: 92,
    description: 'A fanless 13-inch laptop with the M4 chip, a Liquid Retina display and up to 18 hours of battery life.',
    insight: 'Silent, quick and lasts a full workday. Storage upgrades are pricey.',
    aspectRatings: { quality: 4.9, performance: 4.8, design: 4.8, durability: 4.6, value: 4.2 },
    pros: ['All-day battery', 'Silent, fanless design', 'Excellent display'], cons: ['Limited ports', 'Costly storage upgrades'],
    stores: [{ name: 'Amazon', price: 99900, url: '#' }, { name: 'Flipkart', price: 98990, url: '#' }, { name: 'Apple Store', price: 99900, url: '#' }],
    aiSummary: {
      summary: 'Reviewers highlight battery life and silence above all. It handles coding, design and everyday work without slowing down. The main compromises are the small number of ports and the price of higher storage tiers.',
      forWho: 'Good for students and professionals who want long battery life and quiet, reliable performance.',
    },
  },
  {
    id: 'sony-wh-1000xm6', name: 'Sony WH-1000XM6', brand: 'Sony', category: 'electronics', subcategory: 'Headphones',
    image: { kind: 'headphones', tone: 'amber' }, price: 34990, rating: 4.6, reviewCount: 1203, trendingScore: 88,
    description: 'Flagship wireless noise-cancelling headphones with 30-hour battery life and adaptive sound control.',
    insight: 'Best-in-class noise cancelling, very comfortable on long flights.',
    aspectRatings: { quality: 4.6, performance: 4.8, design: 4.5, durability: 4.3, value: 4.2 },
    pros: ['Class-leading noise cancelling', 'Comfortable for hours', 'Long battery life'], cons: ['Case is bulky', 'Pricey'],
    stores: [{ name: 'Amazon', price: 34990, url: '#' }, { name: 'Flipkart', price: 35490, url: '#' }, { name: 'Sony Center', price: 34990, url: '#' }],
    aiSummary: {
      summary: 'Buyers consistently rank the noise cancelling as the best they have used, and long-wear comfort gets similar praise. Complaints centre on the larger carrying case and a price that is hard to justify for casual listeners.',
      forWho: 'Good for commuters and frequent travellers who want the quietest listening experience.',
    },
  },
  {
    id: 'nike-air-max-270', name: 'Nike Air Max 270', brand: 'Nike', category: 'fashion', subcategory: 'Footwear',
    image: { kind: 'shoe', tone: 'coral' }, price: 12495, rating: 4.5, reviewCount: 984, trendingScore: 81,
    description: 'Lifestyle sneakers with a large Max Air heel unit, breathable mesh upper and all-day cushioning.',
    insight: 'Comfortable straight out of the box, fits slightly narrow.',
    aspectRatings: { quality: 4.4, performance: 4.5, design: 4.8, durability: 4.0, value: 4.3 },
    pros: ['Very comfortable', 'Stylish look', 'Lightweight'], cons: ['Runs slightly narrow', 'Sole wears on rough roads'],
    stores: [{ name: 'Nike.com', price: 12495, url: '#' }, { name: 'Amazon', price: 11999, url: '#' }, { name: 'Myntra', price: 12295, url: '#' }],
    aiSummary: {
      summary: 'Wearers love the cushioning and the look. Sizing is the recurring theme, with several reviewers recommending half a size up. Durability is decent but the outsole shows wear on rough surfaces.',
      forWho: 'Good for everyday wear and long walks rather than serious running.',
    },
  },
  {
    id: 'samsung-galaxy-s26', name: 'Samsung Galaxy S26', brand: 'Samsung', category: 'electronics', subcategory: 'Smartphone',
    image: { kind: 'phone', tone: 'indigo' }, price: 74999, rating: 4.5, reviewCount: 1567, trendingScore: 85,
    description: 'A bright 6.2-inch AMOLED display, versatile triple camera and seven years of software updates.',
    insight: 'Gorgeous display and long update promise. Charging is not the fastest.',
    aspectRatings: { quality: 4.5, performance: 4.6, design: 4.4, durability: 4.4, value: 4.3 },
    pros: ['Superb display', '7 years of updates', 'Versatile cameras'], cons: ['Slower charging', 'Bloatware'],
    stores: [{ name: 'Amazon', price: 74999, url: '#' }, { name: 'Flipkart', price: 73999, url: '#' }, { name: 'Samsung Shop', price: 74999, url: '#' }],
    aiSummary: {
      summary: 'The display and camera versatility win most reviews, and the long update policy reassures buyers who keep phones for years. Charging speed and preinstalled apps are the most repeated complaints.',
      forWho: 'Good for users who want a great screen and long-term software support.',
    },
  },
  {
    id: 'dell-xps-14', name: 'Dell XPS 14', brand: 'Dell', category: 'computers', subcategory: 'Laptop',
    image: { kind: 'laptop', tone: 'slate' }, price: 139990, rating: 4.4, reviewCount: 612, trendingScore: 64,
    description: 'A 14-inch OLED ultrabook with a machined aluminium chassis and a haptic touchpad.',
    insight: 'Stunning OLED screen, but fan noise under load and a high price.',
    aspectRatings: { quality: 4.5, performance: 4.5, design: 4.6, durability: 4.2, value: 3.8 },
    pros: ['Beautiful OLED display', 'Premium build', 'Powerful for the size'], cons: ['Fans get loud under load', 'Very expensive'],
    stores: [{ name: 'Amazon', price: 139990, url: '#' }, { name: 'Dell.com', price: 136990, url: '#' }],
    aiSummary: {
      summary: 'Owners praise the screen and the build quality. Performance is strong, though the fans become audible in demanding tasks and battery life trails the best in class. Value is the weakest score.',
      forWho: 'Good for creators who want a premium display and Windows compatibility.',
    },
  },
  {
    id: 'playstation-5-slim', name: 'PlayStation 5 Slim', brand: 'Sony', category: 'gaming', subcategory: 'Console',
    image: { kind: 'console', tone: 'indigo' }, price: 44990, rating: 4.7, reviewCount: 2012, trendingScore: 90,
    description: 'A slimmer PS5 with an ultra-fast SSD, haptic DualSense controller and 4K gaming at up to 120 fps.',
    insight: 'Fast load times and great exclusives. Base storage fills quickly.',
    aspectRatings: { quality: 4.7, performance: 4.8, design: 4.4, durability: 4.5, value: 4.4 },
    pros: ['Instant load times', 'Excellent exclusives', 'Immersive controller'], cons: ['Storage fills fast', 'Games are expensive'],
    stores: [{ name: 'Amazon', price: 44990, url: '#' }, { name: 'Flipkart', price: 45490, url: '#' }, { name: 'Sony Center', price: 44990, url: '#' }],
    aiSummary: {
      summary: 'Players cite the near-instant loading and the DualSense controller as the biggest upgrades. The exclusive library is a major draw. Expect to buy extra storage and to budget for game prices.',
      forWho: 'Good for players who want a plug-and-play console with strong single-player games.',
    },
  },
  {
    id: 'apple-watch-series-11', name: 'Apple Watch Series 11', brand: 'Apple', category: 'electronics', subcategory: 'Smartwatch',
    image: { kind: 'watch', tone: 'sage' }, price: 46900, rating: 4.6, reviewCount: 1348, trendingScore: 76,
    description: 'A bright always-on display, sleep and blood oxygen tracking, and improved 24-hour battery life.',
    insight: 'Best smartwatch for iPhone owners. Battery still needs daily charging.',
    aspectRatings: { quality: 4.7, performance: 4.6, design: 4.7, durability: 4.3, value: 4.1 },
    pros: ['Accurate health tracking', 'Seamless iPhone integration', 'Bright display'], cons: ['Daily charging', 'Only works with iPhone'],
    stores: [{ name: 'Amazon', price: 46900, url: '#' }, { name: 'Flipkart', price: 46490, url: '#' }, { name: 'Croma', price: 46900, url: '#' }],
    aiSummary: {
      summary: 'Owners like how well health tracking and notifications work with an iPhone. The display and build are excellent, but everyone mentions charging every night.',
      forWho: 'Good for iPhone users focused on fitness, sleep and notifications.',
    },
  },
  {
    id: 'ergochair-pro', name: 'ErgoChair Pro', brand: 'Green Soul', category: 'home', subcategory: 'Office chair',
    image: { kind: 'chair', tone: 'slate' }, price: 15999, rating: 4.4, reviewCount: 738, trendingScore: 58,
    description: 'A mesh ergonomic office chair with adjustable lumbar support, 4D armrests and a tilt-lock mechanism.',
    insight: 'Big back-pain relief for the price. Armrests could be softer.',
    aspectRatings: { quality: 4.2, performance: 4.5, design: 4.1, durability: 4.2, value: 4.7 },
    pros: ['Adjustable lumbar support', 'Great value', 'Breathable mesh'], cons: ['Firm armrests', 'Mesh collects dust'],
    stores: [{ name: 'Amazon', price: 15999, url: '#' }, { name: 'Flipkart', price: 16499, url: '#' }],
    aiSummary: {
      summary: 'Buyers working long hours report noticeable back relief, and value is the highest-rated aspect. Complaints are minor: firm armrests and dust in the mesh.',
      forWho: 'Good for work-from-home users who sit 6 or more hours a day.',
    },
  },
  {
    id: 'nintendo-switch-2', name: 'Nintendo Switch 2', brand: 'Nintendo', category: 'gaming', subcategory: 'Console',
    image: { kind: 'console', tone: 'coral' }, price: 39999, rating: 4.5, reviewCount: 1189, trendingScore: 79,
    description: 'A hybrid console with a larger 7.9-inch display, upgraded performance and backward compatibility.',
    insight: 'Great for play anywhere. Battery drains fast in handheld mode.',
    aspectRatings: { quality: 4.4, performance: 4.4, design: 4.6, durability: 4.2, value: 4.4 },
    pros: ['Play docked or handheld', 'Fantastic first-party games', 'Bigger, brighter screen'], cons: ['Short handheld battery', 'Limited storage'],
    stores: [{ name: 'Amazon', price: 39999, url: '#' }, { name: 'Flipkart', price: 40499, url: '#' }, { name: 'Croma', price: 39999, url: '#' }],
    aiSummary: {
      summary: 'Reviewers appreciate the bigger screen and the ability to switch between TV and handheld. First-party games remain the highlight. Handheld battery life is the top complaint.',
      forWho: 'Good for players who want flexibility and family-friendly games.',
    },
  },
  {
    id: 'adidas-ultraboost-light', name: 'Adidas Ultraboost Light', brand: 'Adidas', category: 'fashion', subcategory: 'Footwear',
    image: { kind: 'shoe', tone: 'violet' }, price: 15999, rating: 4.6, reviewCount: 856, trendingScore: 70,
    description: 'Lightweight running shoes with responsive Boost cushioning and a Primeknit+ upper.',
    insight: 'Springy and light for daily runs. Pricey for what it is.',
    aspectRatings: { quality: 4.5, performance: 4.7, design: 4.6, durability: 4.3, value: 4.0 },
    pros: ['Responsive cushioning', 'Very light', 'Sock-like fit'], cons: ['Expensive', 'Light colours stain easily'],
    stores: [{ name: 'Adidas.com', price: 15999, url: '#' }, { name: 'Amazon', price: 14999, url: '#' }, { name: 'Myntra', price: 15499, url: '#' }],
    aiSummary: {
      summary: 'Runners praise the energy return and light weight. Fit is comfortable and sock-like, though lighter colourways stain quickly and the price is high.',
      forWho: 'Good for daily runners and walkers who prioritise cushioning.',
    },
  },
  {
    id: 'nescafe-gold-200g', name: 'Nescafé Gold Instant Coffee 200g', brand: 'Nescafé', category: 'grocery', subcategory: 'Coffee',
    image: { kind: 'jar', tone: 'amber' }, price: 749, rating: 4.3, reviewCount: 3120, trendingScore: 52,
    description: 'Premium instant coffee made from carefully roasted Arabica and Robusta beans in a resealable jar.',
    insight: 'Smooth and rich. A jar goes a long way.',
    aspectRatings: { quality: 4.4, performance: 4.2, design: 4.2, durability: 4.1, value: 4.5 },
    pros: ['Smooth, low bitterness', 'Good value per cup', 'Resealable jar'], cons: ['Mild aroma', 'Can clump in humid weather'],
    stores: [{ name: 'Amazon', price: 749, url: '#' }, { name: 'BigBasket', price: 729, url: '#' }, { name: 'Blinkit', price: 759, url: '#' }],
    aiSummary: {
      summary: 'Customers like the smooth, balanced taste and say one jar lasts weeks. Some find the aroma mild and mention clumping when the jar is left open in humid weather.',
      forWho: 'Good for daily coffee drinkers who want quality on a budget.',
    },
  },
]

export const products = base.map((product) => ({
  ...product,
  gallery: [product.image, { ...product.image, view: 'angle' }, { ...product.image, view: 'detail' }],
  reviews: buildReviews(product.id, product.category),
}))
