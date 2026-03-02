<script setup>
import { ref, computed } from 'vue'
import { cocktails, categories } from './data/menu.js'

const tab = ref('menu') // 'menu' | 'diy'

const byCategory = computed(() => {
  return categories.map(cat => ({
    ...cat,
    items: cocktails.filter(c => c.category === cat.id),
  }))
})
</script>

<template>
  <div class="app">
    <header class="header">
      <h1 class="title">Bar &bullet; Catch of the Birthday</h1>
      <p class="subtitle">Меню</p>
      <nav class="tabs">
        <button
          type="button"
          class="tab"
          :class="{ active: tab === 'menu' }"
          @click="tab = 'menu'"
        >
          Cocktails
        </button>
        <button
          type="button"
          class="tab"
          :class="{ active: tab === 'diy' }"
          @click="tab = 'diy'"
        >
          DIY
        </button>
      </nav>
    </header>

    <main class="main">
      <!-- Барная карта -->
      <section v-show="tab === 'menu'" class="section">
        <div v-for="group in byCategory" :key="group.id" class="menu-group">
          <h2 v-if="group.items.length" class="section-title">
            {{ group.title }} <span class="section-volume">· {{ group.volume }}</span>
          </h2>
          <ul class="card-list">
            <li v-for="item in group.items" :key="item.id" class="card">
              <h3 class="card-title">{{ item.name }}</h3>
              <p v-if="item.shortDescription" class="card-desc">{{ item.shortDescription }}</p>
              <p class="card-ingredients">{{ item.ingredients }}</p>
              <p v-if="item.snackShort" class="card-snacks">
                <span class="snacks-label">Закуска:</span> {{ item.snackShort }}
              </p>
            </li>
          </ul>
        </div>
      </section>

      <!-- Сделай сам — рецепты -->
      <section v-show="tab === 'diy'" class="section section-diy">
        <div v-for="group in byCategory" :key="group.id" class="menu-group">
          <h2 v-if="group.items.length" class="section-title section-title-diy">
            {{ group.title }}
          </h2>
          <ul class="recipe-list">
            <li v-for="item in group.items" :key="item.id" class="recipe-card">
              <h3 class="recipe-title">{{ item.name }}</h3>
              <ul class="recipe-ingredients">
                <li v-for="(ing, i) in item.recipe.ingredients" :key="i">{{ ing }}</li>
              </ul>
              <p class="recipe-steps-label">Приготовление</p>
              <ol class="recipe-steps">
                <li v-for="(step, i) in item.recipe.steps" :key="i">{{ step }}</li>
              </ol>
              <div v-if="item.recipe.snackFull" class="recipe-snack">
                <span class="recipe-snack-label">🍴 Закуска</span>
                <p class="recipe-snack-text">{{ item.recipe.snackFull }}</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: #0c0b0a;
  color: #f2ebe3;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
}

.header {
  padding: clamp(1.25rem, 4vw, 2rem) clamp(1rem, 4vw, 2rem) 0;
  text-align: center;
  border-bottom: 1px solid rgba(201, 162, 39, 0.25);
}

.title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 600;
  letter-spacing: 0.15em;
  color: #c9a227;
  margin: 0 0 0.15em;
}

.subtitle {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1rem, 3vw, 1.35rem);
  font-weight: 400;
  font-style: italic;
  color: rgba(242, 235, 227, 0.85);
  margin: 0 0 1.5rem;
  letter-spacing: 0.08em;
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding-bottom: 0.75rem;
}

.tab {
  font-family: 'Raleway', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  padding: 0.6rem 1.25rem;
  background: transparent;
  color: rgba(242, 235, 227, 0.7);
  border: 1px solid rgba(201, 162, 39, 0.4);
  border-radius: 4px;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}

.tab:hover {
  color: #f2ebe3;
  border-color: rgba(201, 162, 39, 0.6);
}

.tab.active {
  background: rgba(201, 162, 39, 0.15);
  color: #c9a227;
  border-color: #c9a227;
}

.main {
  padding: clamp(1.25rem, 4vw, 2rem) clamp(1rem, 4vw, 2rem) clamp(2rem, 6vw, 3rem);
  max-width: 42rem;
  margin: 0 auto;
}

.menu-group {
  margin-bottom: 1rem;
}

.section {
  animation: fade 0.25s ease;
}

@keyframes fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

.section-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: rgba(201, 162, 39, 0.95);
  margin: 1.75rem 0 0.85rem;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid rgba(201, 162, 39, 0.2);
}

.section-title:first-child {
  margin-top: 0;
}

.section-volume {
  font-weight: 400;
  font-size: 0.95em;
  color: rgba(242, 235, 227, 0.6);
  letter-spacing: 0.04em;
}

.section-title-diy {
  margin-top: 1.5rem;
}

.section-title-diy:first-child {
  margin-top: 0;
}

.card-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.card {
  padding: 1.25rem 1.5rem;
  background: rgba(26, 24, 22, 0.8);
  border: 1px solid rgba(201, 162, 39, 0.2);
  border-radius: 6px;
}

.card-title,
.recipe-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #c9a227;
  margin: 0 0 0.35em;
  letter-spacing: 0.04em;
}

.card-desc {
  font-size: 0.9rem;
  color: rgba(242, 235, 227, 0.8);
  margin: 0 0 0.5em;
  font-style: italic;
}

.card-ingredients {
  font-size: 0.85rem;
  color: rgba(242, 235, 227, 0.9);
  margin: 0 0 0.5em;
}

.card-snacks {
  font-size: 0.85rem;
  color: rgba(201, 162, 39, 0.9);
  margin: 0;
}

.snacks-label {
  font-weight: 500;
  margin-right: 0.35em;
}

/* DIY section */
.section-diy {
  padding-top: 0.5rem;
}

.diy-hint {
  font-size: 0.8rem;
  color: rgba(242, 235, 227, 0.5);
  text-align: center;
  margin: 0 0 1.25rem;
  letter-spacing: 0.06em;
}

.recipe-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.recipe-card {
  padding: 1.35rem 1.5rem;
  background: rgba(26, 24, 22, 0.8);
  border: 1px solid rgba(201, 162, 39, 0.25);
  border-radius: 6px;
}

.recipe-steps-label {
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: rgba(201, 162, 39, 0.9);
  margin: 0.6em 0 0.35em;
}

.recipe-ingredients {
  list-style: none;
  margin: 0 0 0.75em;
  padding: 0;
  font-size: 0.9rem;
  color: rgba(242, 235, 227, 0.9);
}

.recipe-ingredients li {
  padding: 0.2em 0;
  padding-left: 1em;
  position: relative;
}

.recipe-ingredients li::before {
  content: '·';
  position: absolute;
  left: 0;
  color: #c9a227;
}

.recipe-steps {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.9rem;
  color: rgba(242, 235, 227, 0.9);
  line-height: 1.55;
}

.recipe-steps li {
  margin-bottom: 0.4em;
}

.recipe-steps li:last-child {
  margin-bottom: 0;
}

.recipe-snack {
  margin-top: 1rem;
  padding-top: 0.9rem;
  border-top: 1px solid rgba(201, 162, 39, 0.2);
}

.recipe-snack-label {
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: rgba(201, 162, 39, 0.95);
  display: block;
  margin-bottom: 0.4em;
}

.recipe-snack-text {
  font-size: 0.88rem;
  color: rgba(242, 235, 227, 0.85);
  line-height: 1.5;
  margin: 0;
}
</style>
