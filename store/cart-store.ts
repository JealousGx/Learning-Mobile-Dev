import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Item } from "@/constants/data/items";

export type CartItem = Item & {
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  favoriteItems: CartItem[];
  addToCart: (item: Item) => void;
  removeFromCart: (id: number) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  clearCart: () => void;

  addToFavorites: (item: Item) => void;
  removeFromFavorites: (id: number) => void;
  reset: () => void;

  deliveryFee: () => number;
  tax: () => number;
  subtotal: () => number;
  total: () => number;
  totalItems: () => number;
};

const initialState = {
  items: [],
  favoriteItems: [],
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addToCart: (item: Item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            };
          }

          return {
            items: [...state.items, { ...item, quantity: 1 }],
          };
        }),
      removeFromCart: (id: number) =>
        set((state: CartStore) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      incrementQuantity: (id: number) =>
        set((state: CartStore) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        })),
      decrementQuantity: (id: number) =>
        set((state: CartStore) => ({
          items: state.items
            .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () =>
        set((_state: CartStore) => ({
          items: [],
        })),

      addToFavorites: (item: Item) =>
        set((state) => {
          const exists = state.favoriteItems.find((i) => i.id === item.id);

          if (exists) {
            return {
              favoriteItems: state.favoriteItems.filter(
                (i) => i.id !== item.id,
              ),
            };
          }

          return {
            favoriteItems: [...state.favoriteItems, { ...item, quantity: 1 }],
          };
        }),
      removeFromFavorites: (id: number) =>
        set((state: CartStore) => ({
          favoriteItems: state.favoriteItems.filter((item) => item.id !== id),
        })),

      reset: () => set(() => initialState),

      subtotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      tax: () => {
        const TAX_RATE = 0.08; // 8%
        return get().subtotal() * TAX_RATE;
      },

      deliveryFee: () => {
        const subtotal = get().subtotal();
        return subtotal >= 50 ? 0 : 5; // free over $50
      },

      total: () => get().subtotal() + get().tax() + get().deliveryFee(),

      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
