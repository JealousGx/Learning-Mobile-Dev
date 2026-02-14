export const ITEMS = [
  {
    id: 1,
    name: "Aluminum Chair",
    description:
      "A sleek and modern aluminum chair that combines style and durability.",
    price: 99.99,
    image: require("@/assets/images/items/item-1.webp"),
    rating: 4.5,
  },
  {
    id: 2,
    name: "Stylish Chair",
    description:
      "A sleek and modern aluminum chair that combines style and durability.",
    price: 119.99,
    image: require("@/assets/images/items/item-2.webp"),
    rating: 4.0,
  },
  {
    id: 3,
    name: "Luxe Lounge Sofa",
    description:
      "A luxurious lounge sofa with plush cushions and a sleek aluminum frame.",
    price: 99.99,
    image: require("@/assets/images/items/item-3.webp"),
    rating: 4.8,
  },
  {
    id: 4,
    name: "Stylish Clock",
    description: "A sleek and modern stylish clock with a minimalist design.",
    price: 119.99,
    image: require("@/assets/images/items/item-4.webp"),
    rating: 4.2,
  },
  {
    id: 5,
    name: "Serenity Nightstand",
    description:
      "A sleek and modern nightstand with a minimalist design and hidden storage.",
    price: 99.99,
    image: require("@/assets/images/items/item-5.webp"),
    rating: 4.7,
  },
  {
    id: 6,
    name: "Stylish Sofa",
    description: "A sleek and modern stylish sofa with a minimalist design.",
    price: 119.99,
    image: require("@/assets/images/items/item-6.webp"),
    rating: 4.3,
  },
  {
    id: 7,
    name: "Aluminum Chair",
    description:
      "A sleek and modern aluminum chair that combines style and durability.",
    price: 99.99,
    image: require("@/assets/images/items/item-1.webp"),
    rating: 4.5,
  },
  {
    id: 8,
    name: "Stylish Chair",
    description:
      "A sleek and modern aluminum chair that combines style and durability.",
    price: 119.99,
    image: require("@/assets/images/items/item-2.webp"),
    rating: 4.0,
  },
  {
    id: 9,
    name: "Luxe Lounge Sofa",
    description:
      "A luxurious lounge sofa with plush cushions and a sleek aluminum frame.",
    price: 99.99,
    image: require("@/assets/images/items/item-3.webp"),
    rating: 4.8,
  },
  {
    id: 10,
    name: "Stylish Clock",
    description: "A sleek and modern stylish clock with a minimalist design.",
    price: 119.99,
    image: require("@/assets/images/items/item-4.webp"),
    rating: 4.2,
  },
  {
    id: 11,
    name: "Serenity Nightstand",
    description:
      "A sleek and modern nightstand with a minimalist design and hidden storage.",
    price: 99.99,
    image: require("@/assets/images/items/item-5.webp"),
    rating: 4.7,
  },
  {
    id: 12,
    name: "Stylish Sofa",
    description: "A sleek and modern stylish sofa with a minimalist design.",
    price: 119.99,
    image: require("@/assets/images/items/item-6.webp"),
    rating: 4.3,
  },
];

export type Item = (typeof ITEMS)[number];

export const CATEGORIZED_ITEMS: Record<number, Item[]> = {
  2: ITEMS.filter((item) => [1, 2, 4, 7, 8, 10].includes(item.id)), // Office
  1: ITEMS.filter((item) => [3, 6, 9, 12].includes(item.id)), // Living Room
  3: ITEMS.filter((item) => [5, 11].includes(item.id)), // Bedroom
};
