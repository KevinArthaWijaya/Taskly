<template>
  <!-- wrapper (no full-page scroll) -->
  <div class="fixed inset-0 bg-slate-50 overflow-hidden">
    <div class="h-full w-full flex items-center justify-center p-4">
      <!-- card -->
      <div
        class="w-full max-w-5xl bg-white rounded-3xl shadow-[0_28px_80px_rgba(15,23,42,0.12)] ring-1 ring-slate-100/70 overflow-hidden grid lg:grid-cols-2"
      >
        <!-- Left illustration (nempel) -->
        <div
          class="hidden lg:flex items-center justify-end bg-gradient-to-br from-sky-50 via-white to-indigo-50 overflow-hidden"
        >
          <!-- wrapper buat ngatur posisi -->
          <div class="translate-x-[10px]">
            <img
              :src="illustration"
              alt="Task illustration"
              class="select-none pointer-events-none object-contain w-[520px] max-w-none h-auto"
              draggable="false"
            />
          </div>
        </div>

        <!-- Right form (scroll only inside if needed) -->
        <div
          class="px-8 sm:px-10 py-10 max-h-[calc(100vh-32px)] overflow-y-auto"
        >
          <!-- Toast -->
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div
              v-if="toast.show"
              class="mb-4 rounded-2xl border px-4 py-3 text-[13px] font-semibold"
              :class="
                toast.type === 'success'
                  ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
                  : toast.type === 'error'
                  ? 'bg-rose-50 border-rose-100 text-rose-700'
                  : 'bg-sky-50 border-sky-100 text-sky-700'
              "
            >
              {{ toast.message }}
            </div>
          </transition>

          <!-- Logo -->
          <div class="flex justify-center">
            <img
              :src="logo"
              alt="Taskly"
              class="h-[72px] w-auto object-contain select-none"
              draggable="false"
            />
          </div>

          <!-- Heading -->
          <div class="mt-8 text-center">
            <div
              class="mx-auto inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[12px] font-bold text-slate-700"
            >
              <span class="inline-block h-2 w-2 rounded-full bg-sky-500"></span>
              Demo mode (UI only)
            </div>

            <h2
              class="mt-4 text-[26px] font-extrabold text-slate-900 tracking-[2px]"
            >
              Welcome Back
            </h2>
            <p
              class="mt-2 text-[14px] font-medium text-slate-500 tracking-[1.2px]"
            >
              Login to manage your tasks
            </p>
          </div>

          <!-- Google button (demo) -->
          <button
            type="button"
            class="mt-8 w-full h-14 rounded-2xl border border-slate-200 bg-white flex items-center justify-center gap-3 hover:bg-slate-50 active:bg-slate-100 transition focus:outline-none focus:ring-2 focus:ring-sky-200"
            @click="onGoogleDemo"
          >
            <span class="h-6 w-6 inline-flex items-center justify-center">
              <svg
                viewBox="0 0 48 48"
                width="24"
                height="24"
                aria-hidden="true"
              >
                <path
                  fill="#FFC107"
                  d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.9 6.1 29.7 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.1-.1-2.2-.4-3.5z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.9 6.1 29.7 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.2 0 10.1-2 13.7-5.2l-6.3-5.2c-2 1.5-4.6 2.4-7.4 2.4-5.3 0-9.8-3.4-11.4-8.1l-6.6 5.1C9.5 39.6 16.2 44 24 44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.6 20.5H42V20H24v8h11.3c-1 2.8-3 5-5.6 6.4l.1-.1 6.3 5.2C39.8 36 44 30.7 44 24c0-1.1-.1-2.2-.4-3.5z"
                />
              </svg>
            </span>
            <span
              class="text-[14px] font-semibold text-slate-800 tracking-[1.2px]"
            >
              Sign in with Google
            </span>
          </button>

          <!-- Divider -->
          <div class="my-6 flex items-center gap-4">
            <div class="h-px flex-1 bg-slate-200"></div>
            <div
              class="text-[12px] font-medium text-slate-400 tracking-[1.2px]"
            >
              or
            </div>
            <div class="h-px flex-1 bg-slate-200"></div>
          </div>

          <form @submit.prevent="onSubmit" class="space-y-4">
            <!-- Global error -->
            <div
              v-if="error"
              class="text-sm text-rose-700 bg-rose-50 border border-rose-100 rounded-2xl p-3"
            >
              {{ error }}
            </div>

            <!-- Email -->
            <div class="space-y-2">
              <label
                class="text-[12px] font-semibold text-slate-500 tracking-[1.2px]"
              >
                Email
              </label>
              <input
                ref="emailRef"
                v-model.trim="email"
                type="email"
                placeholder="you@example.com"
                class="w-full h-12 rounded-2xl px-4 text-[14px] text-slate-900 placeholder:text-slate-400 outline-none transition border"
                :class="inputClass(!!emailError && touched.email)"
                @blur="touched.email = true"
              />
              <p
                v-if="touched.email && emailError"
                class="text-[12px] text-rose-600"
              >
                {{ emailError }}
              </p>
            </div>

            <!-- Password -->
            <div class="space-y-2">
              <label
                class="text-[12px] font-semibold text-slate-500 tracking-[1.2px]"
              >
                Password
              </label>

              <div class="relative">
                <input
                  ref="passwordRef"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="w-full h-12 rounded-2xl px-4 pr-12 text-[14px] text-slate-900 placeholder:text-slate-400 outline-none transition border"
                  :class="inputClass(!!passwordError && touched.password)"
                  @blur="touched.password = true"
                />
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl hover:bg-slate-100 active:bg-slate-200 inline-flex items-center justify-center text-slate-600"
                  @click="showPassword = !showPassword"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                >
                  <svg
                    v-if="!showPassword"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path
                      d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>

                  <svg
                    v-else
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M3 3l18 18"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M10.6 10.6a2 2 0 0 0 2.8 2.8"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path
                      d="M9.9 5.3A10.7 10.7 0 0 1 12 5c6.5 0 10 7 10 7a18.6 18.6 0 0 1-4.3 5.2"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M6.1 6.1C3.4 8.1 2 12 2 12s3.5 7 10 7c1 0 1.9-.1 2.7-.4"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </div>

              <p
                v-if="touched.password && passwordError"
                class="text-[12px] text-rose-600"
              >
                {{ passwordError }}
              </p>
            </div>

            <!-- Remember + Forgot -->
            <div class="flex items-center justify-between pt-1">
              <label
                class="flex items-center gap-2 text-[13px] font-medium text-slate-600"
              >
                <input
                  v-model="remember"
                  type="checkbox"
                  class="h-4 w-4 rounded border-slate-300 accent-sky-600"
                />
                Remember me
              </label>

              <RouterLink
                to="/forgot-password"
                class="text-[13px] font-semibold text-sky-600 hover:underline"
                @click="toastInfo('Demo only: This page is UI preview.')"
              >
                Forgot Password?
              </RouterLink>
            </div>

            <!-- Button -->
            <button
              type="submit"
              class="w-full h-12 rounded-2xl bg-sky-600 text-white font-bold hover:bg-sky-700 active:bg-sky-800 transition focus:outline-none focus:ring-2 focus:ring-sky-200 inline-flex items-center justify-center gap-2"
              :disabled="isSubmitting"
            >
              <svg
                v-if="isSubmitting"
                class="animate-spin"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2a10 10 0 1 0 10 10"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <span>{{ isSubmitting ? "Signing in..." : "Log in" }}</span>
            </button>
          </form>

          <p class="mt-6 text-center text-[13px] text-slate-500">
            Don’t have an account?
            <RouterLink
              to="/signup"
              class="text-sky-600 hover:underline font-semibold"
            >
              Sign up
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import logo from "@/assets/Taskly-logo.png";
import illustration from "@/assets/login-illustration.png";

const router = useRouter();

const email = ref("");
const password = ref("");
const remember = ref(true);

const REMEMBER_KEY = "taskly_remember";
const EMAIL_KEY = "taskly_email";
const AUTH_KEY = "taskly_token_demo";

onMounted(() => {
  const remembered = localStorage.getItem(REMEMBER_KEY) === "1";
  remember.value = remembered;

  if (remembered) {
    const savedEmail = localStorage.getItem(EMAIL_KEY) || "";
    email.value = savedEmail;
  } else {
    localStorage.removeItem(EMAIL_KEY);
  }
});

const showPassword = ref(false);
const isSubmitting = ref(false);
const error = ref("");

const touched = ref({ email: false, password: false });

const emailRef = ref(null);
const passwordRef = ref(null);

const toast = ref({ show: false, message: "", type: "info" });
let toastTimer;

const toastInfo = (msg) => showToast(msg, "info");
const showToast = (message, type = "info") => {
  toast.value = { show: true, message, type };
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (toast.value.show = false), 2200);
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emailError = computed(() => {
  const e = email.value.trim();
  if (!e) return "Email wajib diisi.";
  if (!emailRegex.test(e)) return "Format email tidak valid.";
  return "";
});

const passwordError = computed(() => {
  const p = password.value || "";
  if (!p) return "Password wajib diisi.";
  if (p.length < 6) return "Password minimal 6 karakter.";
  return "";
});

const inputClass = (hasError) =>
  hasError
    ? "border-rose-300 focus:ring-2 focus:ring-rose-200 focus:border-rose-300"
    : "border-slate-200 focus:ring-2 focus:ring-sky-200 focus:border-sky-200";

const focusFirstInvalid = async () => {
  await nextTick();
  if (emailError.value) {
    emailRef.value?.focus?.();
    emailRef.value?.scrollIntoView?.({ behavior: "smooth", block: "center" });
    return;
  }
  if (passwordError.value) {
    passwordRef.value?.focus?.();
    passwordRef.value?.scrollIntoView?.({
      behavior: "smooth",
      block: "center",
    });
  }
};

const onGoogleDemo = () => {
  showToast("Demo only: Google sign-in is not connected.", "info");
};

const onSubmit = async () => {
  error.value = "";
  touched.value.email = true;
  touched.value.password = true;

  if (emailError.value || passwordError.value) {
    error.value = "Please fix the highlighted fields.";
    await focusFirstInvalid();
    return;
  }

  try {
    isSubmitting.value = true;
    // DEMO: simulasi delay
    await new Promise((r) => setTimeout(r, 550));
    showToast("Demo login success ✅ (no data saved)", "success");

    // Remember me behavior (demo)
    if (remember.value) {
      localStorage.setItem(REMEMBER_KEY, "1");
      localStorage.setItem(EMAIL_KEY, email.value.trim());
      localStorage.setItem(AUTH_KEY, "demo-token"); // token demo biar bisa dipakai guard
    } else {
      localStorage.setItem(REMEMBER_KEY, "0");
      localStorage.removeItem(EMAIL_KEY);
      sessionStorage.setItem(AUTH_KEY, "demo-token"); // token hanya untuk sesi ini
    }

    router.replace("/Home");
  } catch (e) {
    error.value = e?.message || "Login gagal (demo).";
    showToast("Demo error.", "error");
  } finally {
    isSubmitting.value = false;
  }
};

const onForgotNavigate = () => {
  toastInfo("Demo only: This page is UI preview.");
  router.push("/forgot-password");
};
</script>
