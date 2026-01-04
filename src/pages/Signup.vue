<template>
  <div class="fixed inset-0 bg-slate-50 overflow-hidden">
    <div class="h-full w-full flex items-center justify-center p-4">
      <div
        class="w-full max-w-5xl bg-white rounded-3xl shadow-[0_28px_80px_rgba(15,23,42,0.12)] ring-1 ring-slate-100/70 overflow-hidden grid lg:grid-cols-2"
      >
        <!-- Left illustration (nempel) -->
        <div
          class="hidden lg:flex items-center justify-end bg-gradient-to-br from-sky-50 via-white to-indigo-50 overflow-hidden"
        >
          <img
            :src="illustration"
            alt="Signup illustration"
            class="select-none pointer-events-none object-contain w-[860px] max-w-none h-auto translate-x-[120px] -mr-[78px]"
            draggable="false"
          />
        </div>

        <!-- Right form -->
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
              class="h-[56px] w-auto object-contain select-none"
              draggable="false"
            />
          </div>

          <!-- Heading -->
          <div class="mt-6 text-center">
            <div
              class="mx-auto inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[12px] font-bold text-slate-700"
            >
              <span class="inline-block h-2 w-2 rounded-full bg-sky-500"></span>
              Demo mode (UI only)
            </div>

            <h2
              class="mt-4 text-[26px] font-extrabold text-slate-900 tracking-[2px]"
            >
              Sign up
            </h2>
            <p
              class="mt-2 text-[14px] font-medium text-slate-500 tracking-[1.2px]"
            >
              Create your account & manage your tasks
            </p>
          </div>

          <!-- Google signup (demo) -->
          <button
            type="button"
            class="mt-8 w-full h-12 rounded-2xl border border-slate-200 bg-white flex items-center justify-center gap-3 hover:bg-slate-50 active:bg-slate-100 transition focus:outline-none focus:ring-2 focus:ring-sky-200"
            @click="onGoogleDemo"
          >
            <span class="inline-flex items-center justify-center">
              <svg
                viewBox="0 0 48 48"
                width="22"
                height="22"
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
              Sign up with Google
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

            <!-- Username -->
            <div class="space-y-2">
              <label
                class="text-[12px] font-semibold text-slate-500 tracking-[1.2px]"
              >
                Username
              </label>

              <input
                ref="usernameRef"
                v-model.trim="username"
                type="text"
                placeholder="example"
                class="w-full h-12 rounded-2xl px-4 text-[14px] text-slate-900 placeholder:text-slate-400 outline-none transition border"
                :class="inputClass(!!usernameError && touched.username)"
                @blur="touched.username = true"
              />

              <p
                v-if="touched.username && usernameError"
                class="text-[12px] text-rose-600"
              >
                {{ usernameError }}
              </p>
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
              <div class="flex items-center justify-between">
                <label
                  class="text-[12px] font-semibold text-slate-500 tracking-[1.2px]"
                >
                  Password
                </label>

                <span
                  v-if="password"
                  class="text-[12px] font-semibold"
                  :class="meterTextClass"
                >
                  {{ meterText }}
                </span>
              </div>

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

              <!-- Strength bar -->
              <div v-if="password" class="mt-1 flex items-center gap-2">
                <div class="flex-1 grid grid-cols-3 gap-2">
                  <div class="h-1.5 rounded-full" :class="barClass(1)"></div>
                  <div class="h-1.5 rounded-full" :class="barClass(2)"></div>
                  <div class="h-1.5 rounded-full" :class="barClass(3)"></div>
                </div>
              </div>

              <p
                v-if="touched.password && passwordError"
                class="text-[12px] text-rose-600"
              >
                {{ passwordError }}
              </p>
              <p v-else class="text-[12px] text-slate-400">
                Use 8+ characters, include a number and an uppercase for
                stronger security.
              </p>
            </div>

            <!-- Confirm Password -->
            <div class="space-y-2">
              <label
                class="text-[12px] font-semibold text-slate-500 tracking-[1.2px]"
              >
                Confirm Password
              </label>

              <div class="relative">
                <input
                  ref="confirmRef"
                  v-model="confirmPassword"
                  :type="showConfirm ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="w-full h-12 rounded-2xl px-4 pr-12 text-[14px] text-slate-900 placeholder:text-slate-400 outline-none transition border"
                  :class="inputClass(!!confirmError && touched.confirm)"
                  @blur="touched.confirm = true"
                />

                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl hover:bg-slate-100 active:bg-slate-200 inline-flex items-center justify-center text-slate-600"
                  @click="showConfirm = !showConfirm"
                  :aria-label="showConfirm ? 'Hide password' : 'Show password'"
                >
                  <svg
                    v-if="!showConfirm"
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

              <div v-if="confirmPassword" class="flex items-center gap-2">
                <span
                  class="text-[12px] font-semibold"
                  :class="confirmMatch ? 'text-emerald-600' : 'text-rose-600'"
                >
                  {{
                    confirmMatch ? "Passwords match" : "Passwords do not match"
                  }}
                </span>
              </div>

              <p
                v-if="touched.confirm && confirmError"
                class="text-[12px] text-rose-600"
              >
                {{ confirmError }}
              </p>
            </div>

            <!-- Terms -->
            <div class="pt-1 flex items-start gap-3">
              <input
                ref="agreeRef"
                v-model="agree"
                type="checkbox"
                class="mt-1 w-5 h-5 rounded-lg border-slate-300 accent-sky-600"
              />
              <p class="text-[12px] text-slate-500 leading-5">
                I agree to the
                <button
                  type="button"
                  class="font-semibold text-sky-600 hover:underline"
                  @click="toastInfo('Demo only: Terms page is not connected.')"
                >
                  Terms
                </button>
                and
                <button
                  type="button"
                  class="font-semibold text-sky-600 hover:underline"
                  @click="
                    toastInfo('Demo only: Privacy page is not connected.')
                  "
                >
                  Privacy Policy</button
                >.
              </p>
            </div>

            <!-- CTA -->
            <button
              type="submit"
              class="mt-2 w-full h-12 rounded-2xl bg-sky-600 text-white font-bold hover:bg-sky-700 active:bg-sky-800 transition focus:outline-none focus:ring-2 focus:ring-sky-200 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
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
              <span>{{ isSubmitting ? "Creating..." : "Create Account" }}</span>
            </button>

            <RouterLink
              to="/login"
              class="block text-center text-[13px] font-semibold text-slate-900 hover:underline mt-2"
            >
              Back for login
            </RouterLink>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, ref } from "vue";
import { useRouter } from "vue-router";

import logo from "@/assets/Taskly-logo.png";
import illustration from "@/assets/register-illurstration.png";

const router = useRouter();

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const showPassword = ref(false);
const showConfirm = ref(false);

const agree = ref(false);
const error = ref("");
const isSubmitting = ref(false);

const touched = ref({
  username: false,
  email: false,
  password: false,
  confirm: false,
});

const usernameRef = ref(null);
const emailRef = ref(null);
const passwordRef = ref(null);
const confirmRef = ref(null);
const agreeRef = ref(null);

const toast = ref({ show: false, message: "", type: "info" });
let toastTimer;

const showToast = (message, type = "info") => {
  toast.value = { show: true, message, type };
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (toast.value.show = false), 2200);
};
const toastInfo = (m) => showToast(m, "info");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const usernameError = computed(() => {
  const u = username.value.trim();
  if (!u) return "Username wajib diisi.";
  if (u.length < 3) return "Username minimal 3 karakter.";
  if (u.length > 20) return "Username maksimal 20 karakter.";
  if (!/^[a-zA-Z0-9._-]+$/.test(u))
    return "Gunakan huruf/angka dan . _ - saja.";
  return "";
});

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
  if (!/[0-9]/.test(p)) return "Tambahkan minimal 1 angka.";
  if (!/[A-Z]/.test(p)) return "Tambahkan minimal 1 huruf kapital.";
  return "";
});

const confirmError = computed(() => {
  const c = confirmPassword.value || "";
  if (!c) return "Konfirmasi password wajib diisi.";
  if (c !== password.value) return "Konfirmasi password tidak sama.";
  return "";
});

const confirmMatch = computed(() => {
  if (!confirmPassword.value) return false;
  return confirmPassword.value === password.value;
});

const strengthScore = computed(() => {
  const p = password.value || "";
  let s = 0;
  if (p.length >= 8) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[A-Z]/.test(p)) s++;
  return s; // 0..3
});

const meterText = computed(() => {
  if (!password.value) return "";
  if (strengthScore.value <= 1) return "Weak";
  if (strengthScore.value === 2) return "Good";
  return "Strong";
});

const meterTextClass = computed(() => {
  if (strengthScore.value <= 1) return "text-rose-600";
  if (strengthScore.value === 2) return "text-amber-600";
  return "text-emerald-600";
});

const barClass = (index) => {
  const score = strengthScore.value;
  if (score < index) return "bg-slate-200";
  if (score <= 1) return "bg-rose-500";
  if (score === 2) return "bg-amber-500";
  return "bg-emerald-500";
};

const inputClass = (hasError) =>
  hasError
    ? "border-rose-300 focus:ring-2 focus:ring-rose-200 focus:border-rose-300"
    : "border-slate-200 focus:ring-2 focus:ring-sky-200 focus:border-sky-200";

const formValid = computed(() => {
  return (
    !usernameError.value &&
    !emailError.value &&
    !passwordError.value &&
    !confirmError.value &&
    agree.value
  );
});

const focusFirstInvalid = async () => {
  await nextTick();

  if (usernameError.value) {
    usernameRef.value?.focus?.();
    usernameRef.value?.scrollIntoView?.({
      behavior: "smooth",
      block: "center",
    });
    return;
  }
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
    return;
  }
  if (confirmError.value) {
    confirmRef.value?.focus?.();
    confirmRef.value?.scrollIntoView?.({ behavior: "smooth", block: "center" });
    return;
  }
  if (!agree.value) {
    agreeRef.value?.focus?.();
    agreeRef.value?.scrollIntoView?.({ behavior: "smooth", block: "center" });
  }
};

const onGoogleDemo = () => {
  showToast("Demo only: Google sign-up is not connected.", "info");
};

const onSubmit = async () => {
  error.value = "";

  touched.value.username = true;
  touched.value.email = true;
  touched.value.password = true;
  touched.value.confirm = true;

  if (!formValid.value) {
    error.value = "Please fix the highlighted fields.";
    await focusFirstInvalid();
    return;
  }

  try {
    isSubmitting.value = true;

    // DEMO: simulasi delay
    await new Promise((r) => setTimeout(r, 650));
    showToast("Demo account created ✅ (no data saved)", "success");

    // Optional: arahkan ke login
    router.replace("/login");
  } catch (e) {
    error.value = e?.message || "Gagal membuat akun (demo).";
    showToast("Demo error.", "error");
  } finally {
    isSubmitting.value = false;
  }
};
</script>
