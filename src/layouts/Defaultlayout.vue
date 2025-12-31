<template>
  <div class="min-h-screen">
    <header class="border-b">
      <div
        class="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between"
      >
        <h1 class="text-xl font-bold">Taskly</h1>
        <nav class="text-sm space-x-4">
          <RouterLink to="/" class="hover:underline">Home</RouterLink>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-4 py-6">
      <slot />
    </main>
  </div>
</template>
