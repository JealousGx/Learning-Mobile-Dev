import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { sleep } from "@/utils";

type User = {
  id: string;
  name: string;
  email: string;
  dateOfBirth?: string;
  password?: string;
  number?: string;
  gender?: "male" | "female";
};

type UserState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasOnboarded?: boolean;

  login: (email: string, password: string) => Promise<void>;
  signup: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User, token: string) => Promise<void>;
  updateUser: (user: Partial<User>) => Promise<void>;
  completeOnboarding: () => Promise<void>;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      hasOnboarded: false,

      login: async (email, password) => {
        set({ isLoading: true });

        try {
          // 🔹 Mock API call (for testing)
          await sleep();

          const mockUser = {
            id: "1",
            name: "Test User",
            email,
          };

          const mockToken = "mock-jwt-token";

          set({
            user: mockUser,
            token: mockToken,
            hasOnboarded: Math.random() < 0.5,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });

        await sleep();

        set({
          user: null,
          token: null,
          isAuthenticated: false,
          hasOnboarded: false,
          isLoading: false,
        });
      },

      signup: async (user) => {
        set({ isLoading: true });

        try {
          // 🔹 Mock API call
          await sleep();

          const newUser = {
            id: Date.now().toString(),
            name: user.name,
            email: user.email,
            dateOfBirth: user.dateOfBirth,
          };

          const mockToken = "mock-jwt-token";

          set({
            user: newUser,
            token: mockToken,
            isAuthenticated: true,
            hasOnboarded: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      setUser: async (user, token) => {
        set({ isLoading: true });

        await sleep();

        set({
          user,
          token,
          isAuthenticated: true,
          hasOnboarded: Math.random() < 0.5,
          isLoading: false,
        });
      },

      updateUser: async (user) => {
        set({ isLoading: true });

        await sleep();

        set((state) => ({
          user: {
            ...state.user,
            ...user,
          } as User,
          isLoading: false,
        }));
      },

      completeOnboarding: async () => {
        set({ isLoading: true });

        await sleep();

        set({ hasOnboarded: true, isLoading: false });
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
