import { defineStore } from "pinia";

const KEY = "taskly_auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
  }),
  getters: {
    isAuthenticated: (s) => !!s.token,
  },
  actions: {
    init() {
      const raw = sessionStorage.getItem(KEY) || localStorage.getItem(KEY);
      if (!raw) return;
      try {
        const data = JSON.parse(raw);
        this.user = data.user || null;
        this.token = data.token || null;
      } catch {
        // ignore
      }
    },

    login({ email, password, remember }) {
      if (!email || !password)
        throw new Error("Email dan password wajib diisi.");

      this.user = { email };
      this.token = "demo-token";

      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(
        KEY,
        JSON.stringify({ user: this.user, token: this.token })
      );
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem(KEY);
      sessionStorage.removeItem(KEY);
    },
  },
});
