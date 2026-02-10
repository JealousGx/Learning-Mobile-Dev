export const ITEMS = [
  {
    id: 1,
    name: "Aluminum Chair",
    description:
      "A sleek and modern aluminum chair that combines style and durability.",
    price: 99.99,
    image: require("@/assets/images/items/item-1.webp"),
  },
  {
    id: 2,
    name: "Stylish Chair",
    description:
      "A sleek and modern aluminum chair that combines style and durability.",
    price: 119.99,
    image: require("@/assets/images/items/item-2.webp"),
  },
  {
    id: 3,
    name: "Aluminum Chair",
    description:
      "A sleek and modern aluminum chair that combines style and durability.",
    price: 99.99,
    image: require("@/assets/images/items/item-1.webp"),
  },
  {
    id: 4,
    name: "Stylish Chair",
    description:
      "A sleek and modern aluminum chair that combines style and durability.",
    price: 119.99,
    image: require("@/assets/images/items/item-2.webp"),
  },
  {
    id: 5,
    name: "Aluminum Chair",
    description:
      "A sleek and modern aluminum chair that combines style and durability.",
    price: 99.99,
    image: require("@/assets/images/items/item-1.webp"),
  },
  {
    id: 6,
    name: "Stylish Chair",
    description:
      "A sleek and modern aluminum chair that combines style and durability.",
    price: 119.99,
    image: require("@/assets/images/items/item-2.webp"),
  },
];

export type Item = (typeof ITEMS)[number];
