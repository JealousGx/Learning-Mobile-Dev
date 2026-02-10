export const BEST_SELLERS = [
  {
    id: 1,
    name: "Kitchen Cart",
    description: "A versatile and mobile storage solution for your kitchen.",
    price: 149.99,
    rating: 4.5,
    image: require("@/assets/images/items/best-seller.webp"),
  },
  {
    id: 2,
    name: "Kitchen Cart Deluxe",
    description: "A versatile and mobile storage solution for your kitchen.",
    price: 179.99,
    rating: 4.2,
    image: require("@/assets/images/items/best-seller.webp"),
  },
  {
    id: 3,
    name: "Kitchen Cart Pro",
    description: "A versatile and mobile storage solution for your kitchen.",
    price: 129.99,
    rating: 4.7,
    image: require("@/assets/images/items/best-seller.webp"),
  },
];

export type BestSeller = (typeof BEST_SELLERS)[number];
