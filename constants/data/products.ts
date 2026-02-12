export const PRODUCTS = [
  {
    id: 1,
    name: "Modern Sofa",
    price: 499.99,
    // image: require("@/assets/products/sofa.jpg"),
    category: "Living Room",
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    price: 199.99,
    // image: require("@/assets/products/office-chair.jpg"),
    category: "Office",
  },
  {
    id: 3,
    name: "Wooden Dining Table",
    price: 799.99,
    // image: require("@/assets/products/dining-table.jpg"),
    category: "Dining Room",
  },
  {
    id: 4,
    name: "Queen Bed Frame",
    price: 599.99,
    // image: require("@/assets/products/bed-frame.jpg"),
    category: "Bedroom",
  },
  {
    id: 5,
    name: "Kitchen Island",
    price: 899.99,
    // image: require("@/assets/products/kitchen-island.jpg"),
    category: "Kitchen",
  },
];

export type Product = (typeof PRODUCTS)[number];
