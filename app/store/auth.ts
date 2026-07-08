"use client";

import { create } from "zustand";

export type User = {
  id: number;
  phone: string;
  name: string;
  email: string;
};

type AuthStore = {
  user: User | null;
  token: string | null;
  loading: boolean;

  loadUser: () => void;

  login: (user: User, token: string) => void;

  logout: () => void;

  isLoggedIn: () => boolean;
};

export const useAuth = create<AuthStore>((set, get) => ({
  user: null,

  token: null,

  loading: true,

  loadUser: () => {
    try {
      const token = localStorage.getItem("token");

      const user = localStorage.getItem("user");

      set({
        token: token,
        user: user ? JSON.parse(user) : null,
        loading: false,
      });
    } catch {
      set({
        user: null,
        token: null,
        loading: false,
      });
    }
  },

  login: (user, token) => {
    localStorage.setItem("token", token);

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    set({
      user,
      token,
      loading: false,
    });
  },

  logout: () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    set({
      user: null,
      token: null,
      loading: false,
    });
  },

  isLoggedIn: () => {
    return !!get().token;
  },
}));