import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/models/user";

type UpdateUserInput = Partial<User>;

interface AuthState {
  // STATES
  user: User | null;
  isLoggedIn: boolean;

  // ACTIONS
  login: (user: User) => void;
  logout: () => void;
  register: (user: User) => void;
  updateUser: (data: UpdateUserInput) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // INITIAL STATE
      user: null,
      isLoggedIn: false,

      //ACTIONS

      login: (user: User) => {
        set({ user, isLoggedIn: true });
      },

      logout: () => {
        set({ user: null, isLoggedIn: false });
      },

      register: (user: User) => {
        set({ user });
      },

      updateUser: (data: UpdateUserInput) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
