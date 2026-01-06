<!-- src/pages/Home.vue -->
<template>
  <!-- FULLSCREEN (tanpa padding luar) -->
  <div class="fixed inset-0 bg-slate-50 overflow-hidden">
    <div class="h-full w-full flex">
      <!-- Sidebar -->
      <aside
        class="w-[280px] h-full bg-white border-r border-slate-100 flex flex-col"
      >
        <!-- Brand -->
        <div class="px-6 py-5 flex flex-col items-center justify-center">
          <img
            :src="logo"
            alt="Taskly"
            class="h-9 w-auto select-none"
            draggable="false"
          />

          <div
            class="mt-3 mx-auto inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[12px] font-bold text-slate-700"
          >
            <span class="inline-block h-2 w-2 rounded-full bg-sky-500"></span>
            Demo mode (UI only)
          </div>
        </div>

        <!-- Nav -->
        <nav class="px-4 mt-2 space-y-3">
          <button
            v-for="item in nav"
            :key="item.key"
            type="button"
            class="w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-[13px] font-semibold transition"
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
              <img
                :src="item.icon"
                alt=""
                class="h-5 w-5 select-none pointer-events-none"
                draggable="false"
              />
            </span>
            <span>{{ item.label }}</span>
          </button>
        </nav>

        <!-- Spacer -->
        <div class="flex-1"></div>

        <!-- Bottom card (biar mirip referensi: ada panel rounded di bawah) -->
        <div class="p-4">
          <div
            class="h-[250px] rounded-3xl bg-gradient-to-br from-sky-50 via-white to-indigo-50 ring-1 ring-slate-100/70 overflow-hidden relative"
          >
            <!-- sengaja kosong, ilustrasi orangnya kita taruh di luar sidebar (biar seperti gambar referensi) -->
          </div>
        </div>
      </aside>

      <!-- Main -->
      <main class="flex-1 h-full bg-white overflow-hidden">
        <!-- Topbar -->
        <div
          class="h-[72px] px-10 flex items-center justify-end border-b border-slate-100"
        >
          <div class="flex items-center gap-3">
            <!-- Search (md+ tampil input) -->
            <div class="hidden md:block">
              <div class="relative">
                <svg
                  class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path
                    d="M20 20l-4.2-4.2"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>

                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search tasks..."
                  class="h-10 w-[260px] rounded-2xl border border-slate-200 bg-white pl-11 pr-10 text-[13px] text-slate-700 outline-none focus:ring-2 focus:ring-sky-100"
                />

                <button
                  v-if="searchQuery"
                  type="button"
                  class="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-xl hover:bg-slate-50 text-slate-500 grid place-items-center"
                  aria-label="Clear search"
                  @click="searchQuery = ''"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Notifications -->
            <div ref="notifRef" class="relative">
              <button
                class="h-10 w-10 rounded-2xl hover:bg-slate-50 active:bg-slate-100 grid place-items-center text-slate-600 relative"
                type="button"
                aria-label="Notifications"
                @click.stop="notifOpen = !notifOpen"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path
                    d="M13.7 21a2 2 0 0 1-3.4 0"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>

                <!-- unread badge -->
                <span
                  v-if="unreadCount > 0"
                  class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-extrabold grid place-items-center"
                >
                  {{ unreadCount > 9 ? "9+" : unreadCount }}
                </span>
              </button>

              <!-- Dropdown -->
              <div
                v-if="notifOpen"
                class="absolute right-0 mt-3 w-[340px] rounded-2xl bg-white border border-slate-100 shadow-[0_18px_60px_rgba(15,23,42,0.12)] overflow-hidden z-50"
                @click.stop
              >
                <div
                  class="px-4 py-3 flex items-center justify-between border-b border-slate-100"
                >
                  <p
                    class="text-[12px] font-extrabold tracking-[2px] text-slate-900"
                  >
                    Notifications
                  </p>

                  <div class="flex items-center gap-2">
                    <button
                      type="button"
                      class="text-[12px] font-semibold text-slate-600 hover:underline"
                      @click="markAllRead"
                    >
                      Mark all read
                    </button>
                    <button
                      type="button"
                      class="text-[12px] font-semibold text-rose-600 hover:underline"
                      @click="clearAllNotifs"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div class="max-h-[360px] overflow-y-auto">
                  <div
                    v-if="notifications.length === 0"
                    class="px-4 py-8 text-center text-[13px] text-slate-500"
                  >
                    No notifications yet.
                  </div>

                  <button
                    v-for="n in notifications"
                    :key="n.id"
                    type="button"
                    class="w-full text-left px-4 py-3 border-b border-slate-100 hover:bg-slate-50 transition"
                    @click="markRead(n.id)"
                  >
                    <div class="flex items-start justify-between gap-3">
                      <div class="min-w-0">
                        <div class="flex items-center gap-2">
                          <span
                            class="text-[11px] font-bold px-2 py-1 rounded-full"
                            :class="notifTone(n.type)"
                          >
                            {{ n.type }}
                          </span>
                          <p
                            class="text-[13px] font-extrabold truncate"
                            :class="
                              n.read ? 'text-slate-500' : 'text-slate-900'
                            "
                          >
                            {{ n.title }}
                          </p>
                        </div>

                        <p class="mt-1 text-[12px] text-slate-600">
                          {{ n.message }}
                        </p>

                        <p class="mt-2 text-[11px] text-slate-400">
                          {{ timeAgo(n.ts) }}
                        </p>
                      </div>

                      <span
                        v-if="!n.read"
                        class="mt-1 h-2 w-2 rounded-full bg-sky-500"
                      ></span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <!-- Avatar Dropdown -->
            <div ref="avatarRef" class="relative">
              <button
                type="button"
                class="h-10 w-10 rounded-full overflow-hidden ring-1 ring-slate-200"
                aria-label="Profile menu"
                @click.stop="avatarOpen = !avatarOpen"
              >
                <img
                  :src="avatar"
                  alt="avatar"
                  class="h-full w-full object-cover select-none pointer-events-none"
                  draggable="false"
                />
              </button>

              <!-- Dropdown -->
              <div
                v-if="avatarOpen"
                class="absolute right-0 mt-3 w-[220px] rounded-2xl bg-white border border-slate-100 shadow-[0_18px_60px_rgba(15,23,42,0.12)] overflow-hidden z-50"
                @click.stop
              >
                <button
                  type="button"
                  class="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition text-left"
                  @click="
                    goProfile();
                    avatarOpen = false;
                  "
                >
                  <!-- user icon -->
                  <span
                    class="h-9 w-9 rounded-2xl bg-sky-50 text-sky-600 grid place-items-center"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M15 7.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.5 20.25a7.5 7.5 0 0 1 15 0"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p class="text-[13px] font-extrabold text-slate-900">
                      Profile
                    </p>
                    <p class="text-[12px] text-slate-500">View your info</p>
                  </div>
                </button>

                <button
                  type="button"
                  class="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition text-left"
                  @click="
                    goSettings();
                    avatarOpen = false;
                  "
                >
                  <!-- settings icon -->
                  <span
                    class="h-9 w-9 rounded-2xl bg-slate-50 text-slate-700 grid place-items-center"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M10.5 3h3l.4 2a7.7 7.7 0 0 1 1.7.7l1.8-1.1 2.1 2.1-1.1 1.8c.3.5.5 1.1.7 1.7l2 .4v3l-2 .4a7.7 7.7 0 0 1-.7 1.7l1.1 1.8-2.1 2.1-1.8-1.1c-.5.3-1.1.5-1.7.7l-.4 2h-3l-.4-2a7.7 7.7 0 0 1-1.7-.7l-1.8 1.1-2.1-2.1 1.1-1.8a7.7 7.7 0 0 1-.7-1.7l-2-.4v-3l2-.4c.2-.6.4-1.2.7-1.7L2.6 6.7 4.7 4.6l1.8 1.1c.5-.3 1.1-.5 1.7-.7l.4-2Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p class="text-[13px] font-extrabold text-slate-900">
                      Settings
                    </p>
                    <p class="text-[12px] text-slate-500">Preferences</p>
                  </div>
                </button>

                <div class="h-px bg-slate-100"></div>

                <button
                  type="button"
                  class="w-full px-4 py-3 flex items-center gap-3 hover:bg-rose-50 transition text-left"
                  @click="
                    doLogout();
                    avatarOpen = false;
                  "
                >
                  <!-- logout icon -->
                  <span
                    class="h-9 w-9 rounded-2xl bg-rose-50 text-rose-600 grid place-items-center"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M15 3h2a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4h-2"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10 17l5-5-5-5"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15 12H3"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p class="text-[13px] font-extrabold text-rose-700">
                      Logout
                    </p>
                    <p class="text-[12px] text-rose-600/70">Sign out</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Content (scroll kalau perlu) -->
        <div class="h-[calc(100%-72px)] overflow-y-auto">
          <div class="px-10 py-8">
            <div class="grid gap-8 lg:grid-cols-[1fr_360px] items-start">
              <!-- LEFT -->
              <section>
                <!-- Greeting (dibawah header/topbar) -->
                <div class="mb-6">
                  <h1
                    class="text-[18px] font-extrabold text-slate-900 tracking-[0.5px]"
                  >
                    Hello, {{ userName }}
                  </h1>
                  <p class="mt-1 text-[13px] text-slate-500">
                    Here's what you need to focus on today.
                  </p>
                </div>

                <!-- Stats pills (sesuai referensi: biru merah hijau) -->
                <div class="flex flex-wrap gap-3">
                  <button
                    type="button"
                    @click="activeList = 'today'"
                    class="px-5 py-3 rounded-2xl bg-blue-600 text-white font-extrabold text-[12px] tracking-[2px] flex items-center gap-4"
                    :class="
                      activeList === 'today'
                        ? 'ring-4 ring-blue-100'
                        : 'opacity-90 hover:opacity-100'
                    "
                  >
                    <span>Today</span>
                    <span class="text-[14px]">{{ todayCount }}</span>
                  </button>

                  <button
                    type="button"
                    @click="activeList = 'overdue'"
                    class="px-5 py-3 rounded-2xl bg-rose-600 text-white font-extrabold text-[12px] tracking-[2px] flex items-center gap-4"
                    :class="
                      activeList === 'overdue'
                        ? 'ring-4 ring-rose-100'
                        : 'opacity-90 hover:opacity-100'
                    "
                  >
                    <span>Overdue</span>
                    <span class="text-[14px]">{{ overdueCount }}</span>
                  </button>

                  <button
                    type="button"
                    @click="activeList = 'completed'"
                    class="px-5 py-3 rounded-2xl bg-emerald-600 text-white font-extrabold text-[12px] tracking-[2px] flex items-center gap-4"
                    :class="
                      activeList === 'completed'
                        ? 'ring-4 ring-emerald-100'
                        : 'opacity-90 hover:opacity-100'
                    "
                  >
                    <span>Completed</span>
                    <span class="text-[14px]">{{ completedCount }}</span>
                  </button>
                </div>

                <!-- Header -->
                <div class="mt-8 flex items-center justify-between">
                  <h2
                    class="text-[14px] font-extrabold tracking-[2px] text-slate-900"
                  >
                    {{ listTitle }}
                  </h2>

                  <div class="text-[12px] text-slate-500">
                    {{ visibleTasks.length }} item(s)
                  </div>
                </div>

                <!-- Task list -->
                <div class="mt-4 space-y-4">
                  <div
                    v-if="visibleTasks.length === 0"
                    class="rounded-2xl border border-slate-100 bg-white px-6 py-8 text-center text-[13px] text-slate-500"
                  >
                    No tasks found for "<span
                      class="font-semibold text-slate-700"
                      >{{ searchQuery }}</span
                    >"
                  </div>

                  <div
                    v-for="t in visibleTasks"
                    :key="t.id"
                    class="rounded-2xl bg-white border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.04)] px-6 py-5 flex items-start justify-between gap-6"
                  >
                    <div class="flex items-start gap-4">
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

                      <div class="min-w-0">
                        <div class="flex items-center gap-3 flex-wrap">
                          <p
                            class="text-[13px] font-extrabold"
                            :class="
                              t.done
                                ? 'line-through text-slate-400'
                                : 'text-slate-900'
                            "
                          >
                            {{ t.title }}
                          </p>

                          <span
                            class="text-[11px] font-bold px-2 py-1 rounded-full"
                            :class="priorityPill(t.priority)"
                          >
                            {{ t.priority }}
                          </span>
                        </div>

                        <p class="mt-1 text-[12px] text-slate-500">
                          {{ formatWhen(t.dueAt) }}
                        </p>

                        <div class="mt-3 flex flex-wrap gap-2">
                          <span
                            v-for="tag in t.tags"
                            :key="tag"
                            class="text-[11px] font-semibold text-slate-500 bg-slate-50 ring-1 ring-slate-100 px-3 py-1 rounded-full"
                          >
                            #{{ tag }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Task menu (3 dots) -->
                    <div class="relative" @click.stop>
                      <button
                        type="button"
                        class="h-10 w-10 rounded-2xl hover:bg-slate-50 active:bg-slate-100 grid place-items-center text-slate-500"
                        aria-label="Task menu"
                        @click="toggleTaskMenu(t.id)"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 6h.01"
                            stroke="currentColor"
                            stroke-width="4"
                            stroke-linecap="round"
                          />
                          <path
                            d="M12 12h.01"
                            stroke="currentColor"
                            stroke-width="4"
                            stroke-linecap="round"
                          />
                          <path
                            d="M12 18h.01"
                            stroke="currentColor"
                            stroke-width="4"
                            stroke-linecap="round"
                          />
                        </svg>
                      </button>

                      <!-- Dropdown -->
                      <div
                        v-if="taskMenuOpenId === t.id"
                        class="absolute right-0 mt-2 w-[170px] rounded-2xl bg-white border border-slate-100 shadow-[0_18px_60px_rgba(15,23,42,0.12)] overflow-hidden z-50"
                      >
                        <button
                          type="button"
                          class="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition text-left"
                          @click="openEditTask(t)"
                        >
                          <!-- pencil icon -->
                          <span
                            class="h-8 w-8 rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100 grid place-items-center"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M12 20h9"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                              />
                              <path
                                d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </span>
                          <div>
                            <p
                              class="text-[13px] font-extrabold text-slate-900"
                            >
                              Edit
                            </p>
                            <p class="text-[12px] text-slate-500">
                              Update task
                            </p>
                          </div>
                        </button>

                        <div class="h-px bg-slate-100"></div>

                        <button
                          type="button"
                          class="w-full px-4 py-3 flex items-center gap-3 hover:bg-rose-50 transition text-left"
                          @click="requestDeleteTask(t.id)"
                        >
                          <!-- trash icon -->
                          <span
                            class="h-8 w-8 rounded-xl bg-rose-50 text-rose-600 ring-1 ring-rose-100 grid place-items-center"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M4 7h16"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                              />
                              <path
                                d="M10 11v6"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                              />
                              <path
                                d="M14 11v6"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                              />
                              <path
                                d="M6 7l1 14h10l1-14"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M9 7V4h6v3"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                              />
                            </svg>
                          </span>
                          <div>
                            <p class="text-[13px] font-extrabold text-rose-700">
                              Delete
                            </p>
                            <p class="text-[12px] text-rose-600/70">
                              Remove task
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- RIGHT -->
              <aside class="space-y-6">
                <!-- Quick Actions -->
                <div
                  class="rounded-2xl bg-white border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.04)] p-5"
                >
                  <p
                    class="text-[12px] font-extrabold tracking-[2px] text-slate-900"
                  >
                    Quick Actions
                  </p>

                  <div class="mt-4 space-y-3">
                    <button
                      class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 flex items-center justify-between hover:bg-slate-50 transition"
                    >
                      <span class="flex items-center gap-3">
                        <span
                          class="h-10 w-10 rounded-2xl bg-amber-50 text-amber-600 grid place-items-center"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M12 5v14"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                            />
                            <path
                              d="M5 12h14"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                            />
                          </svg>
                        </span>
                        <span class="text-[13px] font-semibold text-slate-900"
                          >Add Task</span
                        >
                      </span>
                      <ArrowRight />
                    </button>

                    <button
                      class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 flex items-center justify-between hover:bg-slate-50 transition"
                    >
                      <span class="flex items-center gap-3">
                        <span
                          class="h-10 w-10 rounded-2xl bg-sky-50 text-sky-600 grid place-items-center"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M8 6h13"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                            />
                            <path
                              d="M8 12h13"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                            />
                            <path
                              d="M8 18h13"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                            />
                            <path
                              d="M3 6h.01"
                              stroke="currentColor"
                              stroke-width="4"
                              stroke-linecap="round"
                            />
                            <path
                              d="M3 12h.01"
                              stroke="currentColor"
                              stroke-width="4"
                              stroke-linecap="round"
                            />
                            <path
                              d="M3 18h.01"
                              stroke="currentColor"
                              stroke-width="4"
                              stroke-linecap="round"
                            />
                          </svg>
                        </span>
                        <span class="text-[13px] font-semibold text-slate-900"
                          >View All Tasks</span
                        >
                      </span>
                      <ArrowRight />
                    </button>

                    <button
                      class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 flex items-center justify-between hover:bg-slate-50 transition"
                    >
                      <span class="flex items-center gap-3">
                        <span
                          class="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-600 grid place-items-center"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M12 3v10"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                            />
                            <path
                              d="M8 10l4 4 4-4"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M4 17v3h16v-3"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                            />
                          </svg>
                        </span>
                        <span class="text-[13px] font-semibold text-slate-900"
                          >Import / Export</span
                        >
                      </span>
                      <ArrowRight />
                    </button>
                  </div>
                </div>

                <!-- Upcoming -->
                <div
                  class="rounded-2xl bg-white border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.04)] p-5"
                >
                  <div class="flex items-center justify-between">
                    <p
                      class="text-[12px] font-extrabold tracking-[2px] text-slate-900"
                    >
                      Upcoming
                    </p>
                    <button
                      class="text-[12px] font-semibold text-sky-600 hover:underline"
                      type="button"
                    >
                      View
                    </button>
                  </div>

                  <div class="mt-4 space-y-3">
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
                        <ArrowRight />
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Notes -->
                <div
                  class="rounded-2xl bg-white border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.04)] p-5"
                >
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
                    class="mt-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4"
                  >
                    <p class="text-[12px] text-slate-600 leading-5">
                      Break large tasks into smaller steps to finish faster.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>

        <!-- Ilustrasi orang BESAR di kiri bawah (seperti referensi) -->
        <img
          :src="sidebarPerson"
          alt="Person"
          class="pointer-events-none select-none absolute bottom-0 left-6 w-[260px] hidden lg:block"
          draggable="false"
        />

        <!-- Toasts (opsional) -->
        <div class="fixed top-6 right-6 z-[60] space-y-3">
          <div
            v-for="t in toasts"
            :key="t.id"
            class="w-[320px] rounded-2xl bg-white border border-slate-100 shadow-[0_18px_60px_rgba(15,23,42,0.12)] px-4 py-3"
          >
            <p class="text-[13px] font-extrabold text-slate-900">
              {{ t.title }}
            </p>
            <p class="mt-1 text-[12px] text-slate-600">{{ t.message }}</p>
          </div>
        </div>

        <!-- Edit Modal -->
        <div v-if="editOpen" class="fixed inset-0 z-[70]">
          <div
            class="absolute inset-0 bg-slate-900/30"
            @click="editOpen = false"
          ></div>

          <div class="absolute inset-0 grid place-items-center p-4">
            <div
              class="w-full max-w-lg rounded-3xl bg-white border border-slate-100 shadow-[0_28px_80px_rgba(15,23,42,0.18)] overflow-hidden"
            >
              <div
                class="px-6 py-4 border-b border-slate-100 flex items-center justify-between"
              >
                <p
                  class="text-[13px] font-extrabold tracking-[2px] text-slate-900"
                >
                  EDIT TASK
                </p>
                <button
                  type="button"
                  class="h-9 w-9 rounded-2xl hover:bg-slate-50 grid place-items-center text-slate-500"
                  @click="editOpen = false"
                  aria-label="Close"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div class="px-6 py-5 space-y-4">
                <div class="space-y-2">
                  <label
                    class="text-[12px] font-semibold text-slate-500 tracking-[1.2px]"
                    >Title</label
                  >
                  <input
                    v-model="editForm.title"
                    type="text"
                    class="w-full h-12 rounded-2xl px-4 text-[14px] border border-slate-200 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-200"
                  />
                </div>

                <div class="grid gap-4 sm:grid-cols-2">
                  <div class="space-y-2">
                    <label
                      class="text-[12px] font-semibold text-slate-500 tracking-[1.2px]"
                      >Due date</label
                    >
                    <input
                      v-model="editForm.dueLocal"
                      type="datetime-local"
                      class="w-full h-12 rounded-2xl px-4 text-[14px] border border-slate-200 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-200"
                    />
                  </div>

                  <div class="space-y-2">
                    <label
                      class="text-[12px] font-semibold text-slate-500 tracking-[1.2px]"
                      >Priority</label
                    >
                    <select
                      v-model="editForm.priority"
                      class="w-full h-12 rounded-2xl px-4 text-[14px] border border-slate-200 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-200 bg-white"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>

                <div class="space-y-2">
                  <label
                    class="text-[12px] font-semibold text-slate-500 tracking-[1.2px]"
                    >Tags (comma separated)</label
                  >
                  <input
                    v-model="editForm.tagsText"
                    type="text"
                    placeholder="UI/UX, QA"
                    class="w-full h-12 rounded-2xl px-4 text-[14px] border border-slate-200 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-200"
                  />
                </div>
              </div>

              <div
                class="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3"
              >
                <button
                  type="button"
                  class="h-11 px-4 rounded-2xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
                  @click="editOpen = false"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="h-11 px-5 rounded-2xl bg-sky-600 text-white font-bold hover:bg-sky-700"
                  @click="saveEditTask"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Delete Confirm Modal -->
        <div
          v-if="deleteConfirmOpen"
          class="fixed inset-0 z-[80]"
          @keydown.esc="cancelDeleteTask"
        >
          <!-- overlay -->
          <div
            class="absolute inset-0 bg-slate-900/35"
            @click="cancelDeleteTask"
          ></div>

          <!-- modal -->
          <div class="absolute inset-0 grid place-items-center p-4">
            <div
              class="w-full max-w-md rounded-3xl bg-white border border-slate-100 shadow-[0_28px_80px_rgba(15,23,42,0.18)] overflow-hidden"
              @click.stop
            >
              <div class="px-6 pt-6 pb-4">
                <div class="flex items-start gap-4">
                  <div
                    class="h-12 w-12 rounded-2xl bg-rose-50 text-rose-600 ring-1 ring-rose-100 grid place-items-center"
                  >
                    <!-- trash icon -->
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 7h16"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                      <path
                        d="M10 11v6"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                      <path
                        d="M14 11v6"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                      <path
                        d="M6 7l1 14h10l1-14"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9 7V4h6v3"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                  </div>

                  <div class="min-w-0">
                    <p class="text-[16px] font-extrabold text-slate-900">
                      Delete this task?
                    </p>
                    <p class="mt-1 text-[13px] text-slate-600 leading-5">
                      This action can’t be undone. Task:
                      <span class="font-semibold text-slate-800">
                        "{{ deleteTarget?.title }}"
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div class="px-6 pb-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  class="h-11 px-4 rounded-2xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 active:bg-slate-100"
                  @click="cancelDeleteTask"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  class="h-11 px-5 rounded-2xl bg-rose-600 text-white font-extrabold hover:bg-rose-700 active:bg-rose-800 inline-flex items-center gap-2"
                  @click="confirmDeleteTask"
                >
                  <!-- trash icon -->
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 7h16"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M10 11v6"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M14 11v6"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M6 7l1 14h10l1-14"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9 7V4h6v3"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount, watchEffect } from "vue";
import { useRouter } from "vue-router";

import logo from "@/assets/Taskly-logo.png";
import avatar from "@/assets/avatar.png";
import sidebarPerson from "@/assets/taskly_dashboard_person_transparent.png";
import dashboardIcon from "@/assets/dashboard.svg";

const activeNav = ref("dashboard");
const nav = [{ key: "dashboard", label: "Dashboard", icon: dashboardIcon }];

const userName = computed(() => "Darwin");
const router = useRouter();

const now = ref(Date.now());
let timerId;

onMounted(() => {
  timerId = setInterval(() => (now.value = Date.now()), 60_000); // update tiap 1 menit
});
onBeforeUnmount(() => clearInterval(timerId));

function startOfToday() {
  const d = new Date(now.value);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// demo helper: bikin dueAt untuk "hari ini jam x"
function todayAt(h, m) {
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toISOString();
}

// format tampilan seperti "Today, 5:00 PM" atau "Jan 6, 5:00 PM"
function formatWhen(iso) {
  const d = new Date(iso);
  const t = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

  if (isSameDay(d, new Date(now.value))) return `Today, ${t}`;

  const datePart = d.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
  return `${datePart}, ${t}`;
}

const baseVisibleTasks = computed(() => {
  if (activeList.value === "overdue") return overdueTasks.value;
  if (activeList.value === "completed") return completedTasks.value;
  return todayTasks.value;
});

const visibleTasks = computed(() => {
  const q = (searchQuery.value || "").trim().toLowerCase();
  if (!q) return baseVisibleTasks.value;

  return baseVisibleTasks.value.filter((t) => {
    const haystack = [t.title, t.priority, ...(t.tags || [])]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
});

const listTitle = computed(() => {
  if (activeList.value === "overdue") return "Overdue Tasks";
  if (activeList.value === "completed") return "Completed Tasks";
  return "Today Tasks";
});

const searchQuery = ref("");

const filteredTodayTasks = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return todayTasks.value;

  return todayTasks.value.filter((t) => {
    const haystack = [t.title, t.when, t.priority, ...(t.tags || [])]
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });
});

const tasks = ref([
  {
    id: 1,
    title: "Finish UI wireframe for Login",
    dueAt: todayAt(17, 0), // today 5:00 PM
    tags: ["UI/UX"],
    priority: "High",
    done: false,
  },
  {
    id: 2,
    title: "Finish UI wireframe for Login",
    dueAt: todayAt(22, 0), // today 10:00 PM
    tags: ["QA"],
    priority: "Medium",
    done: false,
  },
  {
    id: 3,
    title: "Create test cases for Login",
    dueAt: todayAt(0, 0), // today 12:00 AM
    tags: ["Study"],
    priority: "Low",
    done: false,
  },

  // contoh overdue (kemarin)
  {
    id: 4,
    title: "Fix landing page spacing",
    dueAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    tags: ["UI"],
    priority: "Medium",
    done: false,
  },

  // contoh completed
  {
    id: 5,
    title: "Update README",
    dueAt: todayAt(9, 30),
    tags: ["Docs"],
    priority: "Low",
    done: true,
  },
]);

// ===== Task (3 dots) menu =====
const taskMenuOpenId = ref(null);

// Edit modal
const editOpen = ref(false);
const editForm = ref({
  id: null,
  title: "",
  dueLocal: "", // untuk input datetime-local
  priority: "Low",
  tagsText: "", // "UI/UX, QA"
});

// helper: ISO -> "YYYY-MM-DDTHH:mm"
function isoToLocalInput(iso) {
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  const y = d.getFullYear();
  const m = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hh = pad(d.getHours());
  const mm = pad(d.getMinutes());
  return `${y}-${m}-${day}T${hh}:${mm}`;
}

// helper: "YYYY-MM-DDTHH:mm" -> ISO
function localInputToIso(localStr) {
  // ini akan dianggap local time oleh browser
  const d = new Date(localStr);
  return d.toISOString();
}

function toggleTaskMenu(id) {
  taskMenuOpenId.value = taskMenuOpenId.value === id ? null : id;
}

function openEditTask(t) {
  editForm.value = {
    id: t.id,
    title: t.title,
    dueLocal: isoToLocalInput(t.dueAt),
    priority: t.priority,
    tagsText: (t.tags || []).join(", "),
  };
  editOpen.value = true;
  taskMenuOpenId.value = null;
}

function saveEditTask() {
  const f = editForm.value;
  const t = tasks.value.find((x) => x.id === f.id);
  if (!t) return;

  t.title = f.title.trim() || t.title;
  t.dueAt = localInputToIso(f.dueLocal);
  t.priority = f.priority;

  t.tags = f.tagsText
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  editOpen.value = false;
}

function deleteTask(id) {
  const t = tasks.value.find((x) => x.id === id);
  if (!t) return;

  const ok = window.confirm(`Delete task: "${t.title}" ?`);
  if (!ok) return;

  tasks.value = tasks.value.filter((x) => x.id !== id);
  taskMenuOpenId.value = null;
}

const todayTasks = computed(() => {
  const tdy = new Date(now.value);
  return tasks.value.filter((t) => {
    const due = new Date(t.dueAt);
    return !t.done && isSameDay(due, tdy);
  });
});

const overdueTasks = computed(() => {
  const s = startOfToday();
  return tasks.value.filter((t) => !t.done && new Date(t.dueAt) < s);
});

const completedTasks = computed(() => tasks.value.filter((t) => t.done));

const todayCount = computed(() => todayTasks.value.length);
const overdueCount = computed(() => overdueTasks.value.length);
const completedCount = computed(() => completedTasks.value.length);

function toggleDone(id) {
  const t = tasks.value.find((x) => x.id === id);
  if (!t) return;

  const wasDone = t.done;
  t.done = !t.done;

  // kalau baru selesai (done = true)
  if (!wasDone && t.done) {
    pushNotification({
      type: "completed",
      title: "Task Completed",
      message: `"${t.title}" has been completed.`,
    });
  }
}

// ===== Notifications =====
const notifOpen = ref(false);
const notifRef = ref(null);

const notifications = ref([]); // {id, type, title, message, ts, read}
const unreadCount = computed(
  () => notifications.value.filter((n) => !n.read).length
);

// toast (opsional)
const toasts = ref([]); // {id, title, message}
function pushToast(title, message) {
  const id = crypto?.randomUUID?.() || String(Date.now() + Math.random());
  toasts.value.push({ id, title, message });
  setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }, 2800);
}

function pushNotification({ type = "info", title, message }) {
  const id = crypto?.randomUUID?.() || String(Date.now() + Math.random());
  notifications.value.unshift({
    id,
    type,
    title,
    message,
    ts: Date.now(),
    read: false,
  });

  // toast muncul tiap ada notif masuk (hapus kalau nggak mau)
  pushToast(title, message);
}

function markAllRead() {
  notifications.value = notifications.value.map((n) => ({ ...n, read: true }));
}

function markRead(id) {
  notifications.value = notifications.value.map((n) =>
    n.id === id ? { ...n, read: true } : n
  );
}

function clearAllNotifs() {
  notifications.value = [];
}

function notifTone(type) {
  if (type === "overdue")
    return "bg-rose-50 text-rose-700 ring-1 ring-rose-100";
  if (type === "completed")
    return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100";
  return "bg-slate-50 text-slate-700 ring-1 ring-slate-100";
}

function timeAgo(ts) {
  const diff = Math.max(0, Date.now() - ts);
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

// ===== Avatar dropdown =====
const avatarOpen = ref(false);
const avatarRef = ref(null);

function goProfile() {
  // contoh: router.push('/profile')
  console.log("Profile clicked");
}

function goSettings() {
  // contoh: router.push('/settings')
  console.log("Settings clicked");
}

function doLogout() {
  localStorage.removeItem("taskly_token_demo");
  sessionStorage.removeItem("taskly_token_demo");

  // kalau kamu ingin tetap ingat email saat remember me = true, JANGAN hapus EMAIL_KEY
  router.replace("/login");
}

// Close dropdown kalau klik di luar
function onDocClick(e) {
  // tutup notif kalau klik di luar
  if (notifOpen.value) {
    const el = notifRef.value;
    if (el && !el.contains(e.target)) notifOpen.value = false;
  }

  // tutup avatar dropdown kalau klik di luar
  if (avatarOpen.value) {
    const el2 = avatarRef.value;
    if (el2 && !el2.contains(e.target)) avatarOpen.value = false;
  }

  taskMenuOpenId.value = null;
}

onMounted(() => document.addEventListener("click", onDocClick));
onBeforeUnmount(() => document.removeEventListener("click", onDocClick));

// Trigger notif ketika task masuk overdue (sekali per task)
const notifiedOverdueIds = new Set();

watchEffect(() => {
  // akses overdueTasks biar reactive
  overdueTasks.value.forEach((t) => {
    if (!notifiedOverdueIds.has(t.id)) {
      notifiedOverdueIds.add(t.id);
      pushNotification({
        type: "overdue",
        title: "Task Overdue",
        message: `"${t.title}" is overdue.`,
      });
    }
  });
});

const activeList = ref("today"); // 'today' | 'overdue' | 'completed'

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

function priorityPill(p) {
  if (p === "High") return "bg-rose-50 text-rose-700 ring-1 ring-rose-100";
  if (p === "Medium") return "bg-amber-50 text-amber-700 ring-1 ring-amber-100";
  return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100";
}

const ArrowRight = {
  template: `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
};

// ===== Delete confirm modal =====
const deleteConfirmOpen = ref(false);
const deleteTarget = ref(null); // simpan task yang mau dihapus

function requestDeleteTask(id) {
  const t = tasks.value.find((x) => x.id === id);
  if (!t) return;
  deleteTarget.value = { id: t.id, title: t.title };
  deleteConfirmOpen.value = true;
  taskMenuOpenId.value = null;
}

function confirmDeleteTask() {
  if (!deleteTarget.value) return;
  const id = deleteTarget.value.id;

  tasks.value = tasks.value.filter((x) => x.id !== id);

  // optional: notif/toast kalau kamu punya sistem notif
  // pushNotification({ type: "info", title: "Task deleted", message: `"${deleteTarget.value.title}" removed.` });

  deleteConfirmOpen.value = false;
  deleteTarget.value = null;
}

function cancelDeleteTask() {
  deleteConfirmOpen.value = false;
  deleteTarget.value = null;
}
</script>
