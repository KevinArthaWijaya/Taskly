import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import Signup from "@/pages/Signup.vue";
import ForgotPassword from "@/pages/ForgotPassword.vue";

const routes = [
  // Default landing page
  { path: "/", redirect: "/login" },

  // Auth pages
  { path: "/login", name: "login", component: Login, meta: { layout: "auth" } },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
    meta: { layout: "auth" },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPassword,
    meta: { layout: "auth" },
  },

  // App pages
  { path: "/home", name: "home", component: Home },

  // Fallback 404
  { path: "/:pathMatch(.*)*", redirect: "/login" },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
