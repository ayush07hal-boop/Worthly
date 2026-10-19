// Review pools per category. products.js builds each product's `reviews` array from these,
// shaped like a future GET /products/:id/reviews response.
const pools = {
  electronics: [
    { userId: 'u1', rating: 5, title: 'Fast, smooth and the camera is superb', body: "Used it daily for three months. Performance is flawless, the camera handles low light better than my previous phone, and the display is easy on the eyes outdoors. Battery gets me through a full day of moderate use.", aspects: { quality: 5, performance: 5, design: 5, durability: 4, value: 4 }, status: 'owner', date: '2026-08-14', helpful: 142, comments: 12 },
    { userId: 'u5', rating: 4, title: 'Great device, but the price stings', body: "Everything about it feels premium. I only wish the battery lasted a bit longer on heavy days, and the price is hard to justify unless you really need the upgrade.", aspects: { quality: 5, performance: 4, design: 5, durability: 4, value: 3 }, status: 'owner', date: '2026-07-29', helpful: 88, comments: 5 },
    { userId: 'u3', rating: 3, title: 'Good, not a big jump from last year', body: "If you own last year's model, skip this one. Improvements are real but small. If you are upgrading from something older, it is a big step up.", aspects: { quality: 4, performance: 4, design: 4, durability: 3, value: 2 }, status: 'used', date: '2026-06-18', helpful: 61, comments: 9 },
    { userId: 'u2', rating: 5, title: 'Easily the best I have owned', body: "Build quality is excellent and software updates keep it feeling fresh. Speakers and haptics are noticeably better than the competition.", aspects: { quality: 5, performance: 5, design: 5, durability: 4, value: 4 }, status: 'owner', date: '2026-05-02', helpful: 47, comments: 2 },
  ],
  computers: [
    { userId: 'u2', rating: 5, title: 'Silent, fast and lasts all day', body: "I edit photos and write code on it for 9 to 10 hours without touching the charger. No fan noise at all. The screen and trackpad are the best in this price range.", aspects: { quality: 5, performance: 5, design: 5, durability: 4, value: 4 }, status: 'owner', date: '2026-08-21', helpful: 176, comments: 14 },
    { userId: 'u3', rating: 4, title: 'Excellent, but ports are limited', body: "Performance is more than enough for development work. You will need a dongle for anything beyond the basics, and upgrades to storage are pricey.", aspects: { quality: 5, performance: 5, design: 4, durability: 4, value: 3 }, status: 'owner', date: '2026-07-11', helpful: 93, comments: 7 },
    { userId: 'u5', rating: 4, title: 'Perfect for college', body: "Light enough to carry all day, battery survives back-to-back lectures. Wish it came with more base storage.", aspects: { quality: 4, performance: 4, design: 5, durability: 4, value: 4 }, status: 'used', date: '2026-06-03', helpful: 71, comments: 3 },
  ],
  fashion: [
    { userId: 'u4', rating: 5, title: 'Comfortable from day one', body: "No break-in period at all. Great cushioning for long walks and light runs, and the fit is true to size. Still looks new after two months.", aspects: { quality: 4, performance: 5, design: 5, durability: 4, value: 4 }, status: 'owner', date: '2026-08-09', helpful: 84, comments: 6 },
    { userId: 'u5', rating: 4, title: 'Stylish and easy to wear', body: "Goes with almost everything. The sole wears a little faster than I expected if you walk on rough roads daily.", aspects: { quality: 4, performance: 4, design: 5, durability: 3, value: 4 }, status: 'owner', date: '2026-07-02', helpful: 52, comments: 2 },
    { userId: 'u6', rating: 3, title: 'Nice look, runs slightly narrow', body: "Good looking pair, but I had to go half a size up. Order carefully if you have wider feet.", aspects: { quality: 3, performance: 3, design: 5, durability: 3, value: 3 }, status: 'used', date: '2026-05-21', helpful: 39, comments: 4 },
  ],
  home: [
    { userId: 'u6', rating: 5, title: 'My back thanks me', body: "Assembly took 25 minutes. After six weeks of 8-hour workdays, my lower back pain is basically gone. The lumbar support is adjustable and actually works.", aspects: { quality: 4, performance: 5, design: 4, durability: 4, value: 5 }, status: 'owner', date: '2026-08-05', helpful: 121, comments: 8 },
    { userId: 'u2', rating: 4, title: 'Great value for the price', body: "Solid materials and smooth adjustments. The armrests could be softer, but overall it beats options costing twice as much.", aspects: { quality: 4, performance: 4, design: 4, durability: 4, value: 5 }, status: 'owner', date: '2026-06-27', helpful: 66, comments: 3 },
    { userId: 'u3', rating: 3, title: 'Comfortable, but the fabric collects dust', body: "Comfort is good, but the mesh needs regular cleaning and one wheel was slightly loose out of the box.", aspects: { quality: 3, performance: 4, design: 3, durability: 3, value: 4 }, status: 'used', date: '2026-05-14', helpful: 34, comments: 1 },
  ],
  gaming: [
    { userId: 'u3', rating: 5, title: 'Load times are a thing of the past', body: "Games boot in seconds and the controller feedback adds a lot to immersion. Runs quiet even during long sessions.", aspects: { quality: 5, performance: 5, design: 4, durability: 4, value: 4 }, status: 'owner', date: '2026-08-17', helpful: 109, comments: 10 },
    { userId: 'u5', rating: 4, title: 'Great library, storage fills up fast', body: "You will want extra storage within a month. Otherwise it is a fantastic console with a strong lineup of exclusives.", aspects: { quality: 4, performance: 5, design: 4, durability: 4, value: 3 }, status: 'owner', date: '2026-07-08', helpful: 73, comments: 5 },
    { userId: 'u1', rating: 4, title: 'Solid, wish games were cheaper', body: "Hardware is superb. Game prices are what really add up here, so keep an eye on sales.", aspects: { quality: 4, performance: 5, design: 4, durability: 4, value: 3 }, status: 'used', date: '2026-06-01', helpful: 41, comments: 2 },
  ],
  grocery: [
    { userId: 'u6', rating: 5, title: 'Rich flavour, great price per cup', body: "Smooth and never bitter. One jar lasts me about five weeks with two cups a day. Packaging keeps it fresh to the last spoon.", aspects: { quality: 5, performance: 4, design: 4, durability: 4, value: 5 }, status: 'owner', date: '2026-08-12', helpful: 58, comments: 3 },
    { userId: 'u4', rating: 4, title: 'Reliable pantry staple', body: "Consistent quality every time I reorder. A slightly stronger aroma would make it perfect.", aspects: { quality: 4, performance: 4, design: 4, durability: 4, value: 4 }, status: 'owner', date: '2026-07-01', helpful: 33, comments: 1 },
  ],
}

export function buildReviews(productId, category) {
  const pool = pools[category] ?? pools.electronics
  return pool.map((review, index) => ({ id: `${productId}-r${index + 1}`, productId, ...review }))
}
