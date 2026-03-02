<script setup>
</script>

<template>
  <div class="page">
    <h1>🍹 Party Menu</h1>
    <p class="status">Если ты это видишь с телефона — всё работает!</p>
    <p class="hint">Один Wi‑Fi, один адрес — меню для всех.</p>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: #e8e8e8;
  font-family: system-ui, -apple-system, sans-serif;
  text-align: center;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.status {
  font-size: 1.25rem;
  color: #a8e6cf;
  margin-bottom: 0.5rem;
}

.hint {
  font-size: 0.95rem;
  color: #aaa;
}
</style>
