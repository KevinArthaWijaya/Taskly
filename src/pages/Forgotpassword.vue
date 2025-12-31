<template>
  <div
    class="w-full max-w-5xl bg-white rounded-3xl shadow-[0_28px_80px_rgba(15,23,42,0.12)] ring-1 ring-slate-100/70 overflow-hidden grid lg:grid-cols-2"
  >
    <!-- Left illustration -->
    <div
      class="hidden lg:flex items-center justify-end bg-gradient-to-br from-sky-50 via-white to-indigo-50 overflow-hidden"
    >
      <div class="translate-x-[15px]">
        <img
          :src="illustration"
          alt="Forgot password illustration"
          class="select-none pointer-events-none object-contain w-[520px] max-w-none h-auto"
          draggable="false"
        />
      </div>
    </div>

    <!-- Right -->
    <div class="px-8 sm:px-10 py-12">
      <!-- Logo optional -->
      <div class="flex justify-center">
        <img
          :src="logo"
          alt="Taskly"
          class="h-[56px] w-auto object-contain select-none"
          draggable="false"
        />
      </div>

      <div class="mt-6 text-center">
        <span
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12px] font-semibold bg-sky-50 text-sky-700 ring-1 ring-sky-100"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-sky-500"></span>
          Demo mode (UI only)
        </span>

        <h1
          class="mt-5 text-[24px] font-extrabold text-slate-900 tracking-[1.2px]"
        >
          Forgot Password?
        </h1>
        <p class="mt-2 text-[13px] font-medium text-slate-500 tracking-[0.6px]">
          Enter your email to reset your password
        </p>
      </div>

      <form @submit.prevent="onSubmit" class="mt-8 space-y-4">
        <div
          v-if="error"
          class="text-sm text-rose-700 bg-rose-50 border border-rose-100 rounded-2xl p-3"
        >
          {{ error }}
        </div>

        <div class="space-y-2">
          <label
            class="text-[12px] font-semibold text-slate-500 tracking-[1.2px]"
          >
            Email
          </label>

          <div class="relative">
            <!-- icon email -->
            <span
              class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M6 8l6 4 6-4"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>

            <input
              v-model.trim="email"
              type="email"
              placeholder="you@example.com"
              class="w-full h-12 rounded-2xl border border-slate-200 pl-11 pr-4 text-[14px] text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-sky-200 focus:border-sky-200"
            />
          </div>

          <p class="text-[12px] text-slate-400">
            We’ll send a reset link to this email (demo only).
          </p>
        </div>

        <button
          type="submit"
          class="w-full h-12 rounded-2xl bg-sky-600 text-white font-bold hover:bg-sky-700 active:bg-sky-800 transition focus:outline-none focus:ring-2 focus:ring-sky-200 inline-flex items-center justify-center gap-2"
        >
          Reset password
        </button>

        <RouterLink
          to="/login"
          class="block text-center text-[13px] font-semibold text-slate-900 hover:underline"
        >
          Back for login
        </RouterLink>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import logo from "@/assets/Taskly-logo.png";
import illustration from "@/assets/forgot-illustration.png"; // ganti sesuai asset kamu

const email = ref("");
const error = ref("");

const onSubmit = () => {
  error.value = "";

  // UI only: validasi ringan
  if (!email.value) {
    error.value = "Email wajib diisi.";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    error.value = "Format email tidak valid.";
    return;
  }

  // Demo only
  alert("Demo mode: reset password tidak benar-benar mengirim email.");
};
</script>
