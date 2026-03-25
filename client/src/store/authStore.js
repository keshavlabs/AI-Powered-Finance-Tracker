import { create } from "zustand";
import authService from "../services/authService";

const useAuthStore = create((set) => ({
  user: null,
  token: authService.getToken() || null,
  isAuthenticated: !!authService.getToken(),
  loading: false,

  // Register
  register: async (name, email, password) => {
    set({ loading: true });

    try {
      const data = await authService.register(name, email, password);
      set({ loading: false });
      return data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  // login
  login: async (email, password) => {
    set({ loading: true });

    try {
      const data = await authService.login(email, password);

      set({
        user: data.user || null,
        token: data.token,
        isAuthenticated: true,
        loading: false,
      });

      return data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  // logout
  logout: () => {
    authService.logout();

    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));

export default useAuthStore;
