import { create } from "zustand";
import { persist } from "zustand/middleware";

type Club = {
  id: string;
  email: string;
  logo: string;
};

export enum Role {
  COACH = "coach",
  PLAYER = "player",
  CLUB = "club",
}

export enum Position {
  GOALKEEPER = "goalkeeper",
  DEFENDER = "defender",
  MIDFIELDER = "midfielder",
  ATTACKER = "attacker",
}

interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  role: Role;
  avatar?: string;
  bio?: string;
  position?: Position;
  country?: string;
  city?: string;
  club?: Club;
}

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

export const useAuthStore = create<AuthState>((set) => ({
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
}));
