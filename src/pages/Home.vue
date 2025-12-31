<template>
  <div class="min-h-screen bg-slate-50">
    <div class="mx-auto max-w-7xl px-4 py-6 lg:py-8">
      <!-- Layout -->
      <div class="grid gap-6 lg:grid-cols-[260px_1fr] items-start">
        <!-- Sidebar -->
        <aside
          class="rounded-3xl bg-white ring-1 ring-slate-100 shadow-[0_18px_60px_rgba(15,23,42,0.06)] overflow-hidden"
        >
          <!-- Brand -->
          <div class="px-6 py-5 flex items-center gap-3">
            <img
              :src="logo"
              alt="Taskly"
              class="h-9 w-auto select-none"
              draggable="false"
            />
          </div>

          <!-- Nav -->
          <nav class="px-3 pb-5">
            <button
              v-for="item in nav"
              :key="item.key"
              type="button"
              class="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-semibold tracking-[1px] transition"
              :class="
                item.key === activeNav
                  ? 'bg-sky-50 text-slate-900 ring-1 ring-sky-100'
                  : 'text-slate-600 hover:bg-slate-50'
              "
              @click="activeNav = item.key"
            >
              <span
                class="h-10 w-10 rounded-2xl grid place-items-center"
                :class="item.key === activeNav ? 'bg-white' : 'bg-slate-50'"
              >
                <component :is="item.icon" />
              </span>
              <span>{{ item.label }}</span>
            </button>
          </nav>

          <!-- Sidebar Illustration -->
          <div class="px-4 pb-6">
            <div
              class="rounded-3xl bg-gradient-to-br from-sky-50 via-white to-indigo-50 ring-1 ring-slate-100/70 overflow-hidden h-[220px] relative"
            >
              <img
                :src="illustration"
                alt="Illustration"
                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[260px] select-none pointer-events-none"
                draggable="false"
              />
            </div>
          </div>
        </aside>

        <!-- Main -->
        <main
          class="rounded-3xl bg-white ring-1 ring-slate-100 shadow-[0_18px_60px_rgba(15,23,42,0.06)] overflow-hidden"
        >
          <!-- Topbar -->
          <div
            class="px-6 py-5 border-b border-slate-100 flex items-center justify-between gap-4"
          >
            <div>
              <h1
                class="text-[18px] font-extrabold text-slate-900 tracking-[1px]"
              >
                Hello, {{ userName }}
              </h1>
              <p class="mt-1 text-[13px] text-slate-500">
                Here's what you need to focus on today.
              </p>
            </div>

            <div class="flex items-center gap-3">
              <!-- Search -->
              <button
                type="button"
                class="h-10 w-10 rounded-2xl hover:bg-slate-50 active:bg-slate-100 grid place-items-center text-slate-600"
                @click="toast('Demo only: Search UI.')"
                aria-label="Search"
              >
                <SearchIcon />
              </button>

              <!-- Bell -->
              <button
                type="button"
                class="h-10 w-10 rounded-2xl hover:bg-slate-50 active:bg-slate-100 grid place-items-center text-slate-600 relative"
                @click="toast('Demo only: Notifications UI.')"
                aria-label="Notifications"
              >
                <BellIcon />
                <span
                  class="absolute top-2 right-2 h-2 w-2 rounded-full bg-amber-400"
                ></span>
              </button>

              <!-- Avatar -->
              <button
                type="button"
                class="h-10 w-10 rounded-2xl bg-slate-900 text-white grid place-items-center text-[12px] font-extrabold"
                @click="toast('Demo only: Profile menu.')"
                aria-label="Profile"
              >
                {{ initials }}
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <div class="grid gap-6 lg:grid-cols-[1fr_320px] items-start">
              <!-- Left -->
              <section>
                <!-- Stats -->
                <div class="flex flex-wrap gap-3">
                  <StatPill label="Today" :value="todayCount" tone="sky" />
                  <StatPill label="Overdue" :value="overdueCount" tone="rose" />
                  <StatPill
                    label="Completed"
                    :value="completedCount"
                    tone="emerald"
                  />
                </div>

                <!-- Today tasks header -->
                <div class="mt-6 flex items-center justify-between">
                  <h2
                    class="text-[14px] font-extrabold tracking-[2px] text-slate-900"
                  >
                    Today Tasks
                  </h2>
                  <div class="text-[12px] text-slate-500">
                    {{ todayTasks.length }} item(s)
                  </div>
                </div>

                <!-- Task list -->
                <div class="mt-3 space-y-3">
                  <div
                    v-for="t in todayTasks"
                    :key="t.id"
                    class="rounded-2xl border border-slate-100 bg-white px-4 py-4 flex items-start justify-between gap-4 hover:shadow-sm transition"
                  >
                    <div class="flex items-start gap-3">
                      <button
                        type="button"
                        class="mt-1 h-6 w-6 rounded-lg border border-slate-200 grid place-items-center"
                        :class="
                          t.done
                            ? 'bg-emerald-500 border-emerald-500'
                            : 'bg-white'
                        "
                        @click="toggleDone(t.id)"
                        :aria-label="t.done ? 'Mark as undone' : 'Mark as done'"
                      >
                        <svg
                          v-if="t.done"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M20 6L9 17l-5-5"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>

                      <div>
                        <div class="flex flex-wrap items-center gap-2">
                          <p
                            class="text-[13px] font-bold text-slate-900"
                            :class="t.done ? 'line-through text-slate-400' : ''"
                          >
                            {{ t.title }}
                          </p>
                          <span
                            class="text-[11px] font-semibold px-2 py-0.5 rounded-full ring-1"
                            :class="priorityBadge(t.priority)"
                          >
                            {{ t.priority }}
                          </span>
                        </div>

                        <p class="mt-1 text-[12px] text-slate-500">
                          {{ t.when }}
                        </p>

                        <div class="mt-2 flex flex-wrap gap-2">
                          <span
                            v-for="tag in t.tags"
                            :key="tag"
                            class="text-[11px] font-semibold text-slate-500 bg-slate-50 ring-1 ring-slate-100 px-2 py-1 rounded-full"
                          >
                            #{{ tag }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      class="h-9 w-9 rounded-xl hover:bg-slate-50 active:bg-slate-100 grid place-items-center text-slate-500"
                      @click="toast('Demo only: Task menu.')"
                      aria-label="Task menu"
                    >
                      <DotsIcon />
                    </button>
                  </div>
                </div>
              </section>

              <!-- Right panel -->
              <aside class="space-y-6">
                <!-- Quick actions -->
                <div
                  class="rounded-2xl border border-slate-100 overflow-hidden bg-white"
                >
                  <div class="px-4 py-3 flex items-center justify-between">
                    <p
                      class="text-[12px] font-extrabold tracking-[2px] text-slate-900"
                    >
                      Quick Actions
                    </p>

                    <button
                      type="button"
                      class="h-9 w-9 rounded-xl hover:bg-slate-50 active:bg-slate-100 grid place-items-center text-slate-500"
                      @click="showQuick = !showQuick"
                      aria-label="Toggle actions"
                    >
                      <ChevronIcon
                        :class="showQuick ? 'rotate-90' : ''"
                        class="transition"
                      />
                    </button>
                  </div>

                  <div v-show="showQuick" class="px-4 pb-4 space-y-2">
                    <button
                      type="button"
                      class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition"
                      @click="toast('Demo only: Add task UI.')"
                    >
                      <span class="flex items-center gap-3">
                        <span
                          class="h-9 w-9 rounded-2xl bg-amber-50 text-amber-600 grid place-items-center"
                        >
                          <PlusIcon />
                        </span>
                        <span class="text-[13px] font-semibold text-slate-900"
                          >Add Task</span
                        >
                      </span>
                      <ArrowIcon />
                    </button>

                    <button
                      type="button"
                      class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition"
                      @click="toast('Demo only: View all tasks.')"
                    >
                      <span class="flex items-center gap-3">
                        <span
                          class="h-9 w-9 rounded-2xl bg-sky-50 text-sky-600 grid place-items-center"
                        >
                          <ListIcon />
                        </span>
                        <span class="text-[13px] font-semibold text-slate-900"
                          >View All Tasks</span
                        >
                      </span>
                      <ArrowIcon />
                    </button>

                    <button
                      type="button"
                      class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition"
                      @click="toast('Demo only: Import/Export UI.')"
                    >
                      <span class="flex items-center gap-3">
                        <span
                          class="h-9 w-9 rounded-2xl bg-emerald-50 text-emerald-600 grid place-items-center"
                        >
                          <DownloadIcon />
                        </span>
                        <span class="text-[13px] font-semibold text-slate-900"
                          >Import / Export</span
                        >
                      </span>
                      <ArrowIcon />
                    </button>
                  </div>
                </div>

                <!-- Upcoming -->
                <div class="rounded-2xl border border-slate-100 bg-white p-4">
                  <div class="flex items-center justify-between">
                    <p
                      class="text-[12px] font-extrabold tracking-[2px] text-slate-900"
                    >
                      Upcoming
                    </p>
                    <button
                      type="button"
                      class="text-[12px] font-semibold text-sky-600 hover:underline"
                      @click="toast('Demo only: Upcoming list.')"
                    >
                      View
                    </button>
                  </div>

                  <div class="mt-3 space-y-3">
                    <div
                      v-for="u in upcoming"
                      :key="u.id"
                      class="rounded-2xl border border-slate-100 px-4 py-3 flex items-center justify-between"
                    >
                      <div class="flex items-center gap-3">
                        <span
                          class="text-[12px] font-extrabold tracking-[2px]"
                          :class="u.tone"
                        >
                          {{ u.day }}
                        </span>
                        <span class="text-[12px] text-slate-700">
                          - {{ u.title }}
                        </span>
                      </div>
                      <span class="text-slate-400">
                        <ArrowIcon />
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Notes -->
                <div class="rounded-2xl border border-slate-100 bg-white p-4">
                  <p
                    class="text-[12px] font-extrabold tracking-[2px] text-slate-900"
                  >
                    Notes
                  </p>
                  <p
                    class="mt-1 text-[12px] font-semibold text-slate-500 tracking-[1px]"
                  >
                    Tip of the day
                  </p>

                  <div
                    class="mt-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4"
                  >
                    <p class="text-[12px] text-slate-600 leading-5">
                      Break large tasks into smaller steps to finish faster.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>

    <!-- Tiny toast (demo) -->
    <div
      v-show="toastOpen"
      class="fixed left-1/2 -translate-x-1/2 bottom-6 z-50"
    >
      <div
        class="rounded-2xl bg-slate-900 text-white px-4 py-3 text-[13px] shadow-lg"
      >
        {{ toastMsg }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
// kalau kamu punya auth store, boleh dipakai. kalau tidak, aman karena try/catch.
// import { useAuthStore } from "@/stores/auth";

import logo from "@/assets/Taskly-logo.png";
// pakai asset yang sudah kamu punya (ubah sesuai nama file kamu)
import illustration from "@/assets/login-illustration.png";

/** nav */
const activeNav = ref("dashboard");
const nav = [
  { key: "dashboard", label: "Dashboard", icon: DashboardIcon },
  { key: "tasks", label: "Tasks", icon: TasksIcon },
  { key: "settings", label: "Settings", icon: SettingsIcon },
];

/** user display */
const userName = computed(() => {
  // const auth = useAuthStore()
  // return auth?.user?.name || "Darwin"
  return "Darwin";
});
const initials = computed(() => {
  const name = userName.value || "U";
  const parts = name.trim().split(" ");
  const first = parts[0]?.[0] || "U";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
  return (first + last).toUpperCase();
});

/** dummy tasks */
const tasks = ref([
  {
    id: 1,
    title: "Finish UI wireframe for Login",
    when: "Today, 5:00 PM",
    tags: ["UI/UX"],
    priority: "High",
    done: false,
    status: "today",
  },
  {
    id: 2,
    title: "Finish UI wireframe for Login",
    when: "Today, 10:00 PM",
    tags: ["QA"],
    priority: "Medium",
    done: false,
    status: "today",
  },
  {
    id: 3,
    title: "Create test cases for Login",
    when: "Today, 12:00 AM",
    tags: ["Study"],
    priority: "Low",
    done: false,
    status: "today",
  },
  {
    id: 4,
    title: "Update dashboard spacing",
    when: "Yesterday, 6:00 PM",
    tags: ["UI/UX"],
    priority: "High",
    done: false,
    status: "overdue",
  },
  {
    id: 5,
    title: "Clean up components",
    when: "Mon, 9:00 AM",
    tags: ["Refactor"],
    priority: "Low",
    done: true,
    status: "completed",
  },
]);

const todayTasks = computed(() =>
  tasks.value.filter((t) => t.status === "today")
);
const todayCount = computed(
  () => todayTasks.value.filter((t) => !t.done).length
);
const overdueCount = computed(
  () => tasks.value.filter((t) => t.status === "overdue" && !t.done).length
);
const completedCount = computed(
  () => tasks.value.filter((t) => t.done || t.status === "completed").length
);

function toggleDone(id) {
  const t = tasks.value.find((x) => x.id === id);
  if (!t) return;
  t.done = !t.done;
  // demo: kalau done, anggap completed
  t.status = t.done
    ? "completed"
    : t.status === "completed"
    ? "today"
    : t.status;
}

/** Upcoming dummy */
const upcoming = ref([
  {
    id: "u1",
    day: "Tue",
    title: "Submit portfolio draft",
    tone: "text-sky-600",
  },
  {
    id: "u2",
    day: "Wed",
    title: "Design Register page",
    tone: "text-emerald-600",
  },
  { id: "u3", day: "Thu", title: "Review user flow", tone: "text-amber-600" },
]);

/** quick actions */
const showQuick = ref(true);

/** demo toast */
const toastOpen = ref(false);
const toastMsg = ref("");
let toastTimer;
function toast(message) {
  toastMsg.value = message;
  toastOpen.value = true;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (toastOpen.value = false), 1200);
}

/** styles helpers */
function priorityBadge(priority) {
  if (priority === "High") return "bg-rose-50 text-rose-700 ring-rose-100";
  if (priority === "Medium") return "bg-amber-50 text-amber-700 ring-amber-100";
  return "bg-emerald-50 text-emerald-700 ring-emerald-100";
}

/** small local components */
const StatPill = {
  props: { label: String, value: Number, tone: String },
  template: `
    <div
      class="flex items-center gap-3 rounded-2xl px-4 py-3 ring-1"
      :class="toneClass"
    >
      <span class="text-[12px] font-extrabold tracking-[2px]" :class="labelClass">{{ label }}</span>
      <span class="text-[14px] font-extrabold" :class="valueClass">{{ value }}</span>
    </div>
  `,
  computed: {
    toneClass() {
      if (this.tone === "rose") return "bg-rose-50 ring-rose-100";
      if (this.tone === "emerald") return "bg-emerald-50 ring-emerald-100";
      return "bg-sky-50 ring-sky-100";
    },
    labelClass() {
      if (this.tone === "rose") return "text-rose-700";
      if (this.tone === "emerald") return "text-emerald-700";
      return "text-sky-700";
    },
    valueClass() {
      if (this.tone === "rose") return "text-rose-800";
      if (this.tone === "emerald") return "text-emerald-800";
      return "text-sky-800";
    },
  },
};

/** icons (inline SVG) */
function iconWrap(svg) {
  return { template: svg };
}

const DashboardIcon = iconWrap(`
<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
  <path d="M4 4h7v7H4V4Z" stroke="currentColor" stroke-width="2" />
  <path d="M13 4h7v4h-7V4Z" stroke="currentColor" stroke-width="2" />
  <path d="M13 10h7v10h-7V10Z" stroke="currentColor" stroke-width="2" />
  <path d="M4 13h7v7H4v-7Z" stroke="currentColor" stroke-width="2" />
</svg>`);

const TasksIcon = iconWrap(`
<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
  <path d="M9 6h11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M9 12h11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M9 18h11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M4 6h.01" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
  <path d="M4 12h.01" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
  <path d="M4 18h.01" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
</svg>`);

const SettingsIcon = iconWrap(`
<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" stroke-width="2"/>
  <path d="M19.4 15a1.8 1.8 0 0 0 .36 1.98l.03.03a2.2 2.2 0 0 1-1.56 3.76 2.2 2.2 0 0 1-1.56-.65l-.03-.03A1.8 1.8 0 0 0 15 19.4a1.8 1.8 0 0 0-1 1.64V21a2.2 2.2 0 0 1-4.4 0v-.04a1.8 1.8 0 0 0-1-1.64 1.8 1.8 0 0 0-1.98.36l-.03.03a2.2 2.2 0 0 1-3.76-1.56 2.2 2.2 0 0 1 .65-1.56l.03-.03A1.8 1.8 0 0 0 4.6 15a1.8 1.8 0 0 0-1.64-1H3a2.2 2.2 0 0 1 0-4.4h-.04A1.8 1.8 0 0 0 4.6 8.6a1.8 1.8 0 0 0-.36-1.98l-.03-.03A2.2 2.2 0 0 1 5.77 2.83c.58 0 1.14.23 1.56.65l.03.03A1.8 1.8 0 0 0 9 4.6a1.8 1.8 0 0 0 1-1.64V3a2.2 2.2 0 0 1 4.4 0v.04a1.8 1.8 0 0 0 1 1.64 1.8 1.8 0 0 0 1.98-.36l.03-.03a2.2 2.2 0 0 1 3.76 1.56 2.2 2.2 0 0 1-.65 1.56l-.03.03A1.8 1.8 0 0 0 19.4 9c.77 0 1.46.48 1.72 1.2.06.16.09.34.09.52a2.2 2.2 0 0 1-1.81 2.18H19.4a1.8 1.8 0 0 0 0 2.1Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`);

const SearchIcon = iconWrap(`
<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
  <path d="M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z" stroke="currentColor" stroke-width="2"/>
  <path d="M20 20l-4.2-4.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`);

const BellIcon = iconWrap(`
<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
  <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z" stroke="currentColor" stroke-width="2"/>
  <path d="M13.7 21a2 2 0 0 1-3.4 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`);

const DotsIcon = iconWrap(`
<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
  <path d="M12 6h.01" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
  <path d="M12 12h.01" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
  <path d="M12 18h.01" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
</svg>`);

const PlusIcon = iconWrap(`
<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
  <path d="M12 5v14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`);

const ListIcon = iconWrap(`
<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
  <path d="M8 6h13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M8 12h13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M8 18h13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M3 6h.01" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
  <path d="M3 12h.01" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
  <path d="M3 18h.01" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
</svg>`);

const DownloadIcon = iconWrap(`
<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
  <path d="M12 3v10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M8 10l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4 17v3h16v-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`);

const ArrowIcon = iconWrap(`
<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
  <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`);

const ChevronIcon = iconWrap(`
<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
  <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`);
</script>
