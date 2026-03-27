<template>
  <div class="pm-app">
    <header class="pm-app__header">
      <h1 class="pm-app__title">Home &bullet; Bar</h1>
      <nav class="pm-app__tabs">
        <button type="button" class="tab" :class="{ active: tab === 'menu' }" @click="tab = 'menu'">
          Menu
        </button>
        <button type="button" class="tab" :class="{ active: tab === 'pantry' }" @click="tab = 'pantry'">
          Pantry
        </button>
      </nav>
    </header>

    <main class="pm-app__main">
      <!-- Барная карта -->
      <section v-show="tab === 'menu'" class="pm-section">
        <BaseFilterAccordion v-model="base" :options="baseFilters" @update:model-value="openId = null" />

        <div v-for="group in drinksByCategory" :key="group.id" class="pm-menu-group">
          <h2 v-if="group.items.length" class="pm-menu-group__title">
            {{ group.title }} <span class="pm-menu-group__volume">· {{ group.volume }}</span>
          </h2>
          <ul class="pm-list">
            <AccordionCard
              v-for="item in group.items"
              :key="item.id"
              :item="item"
              variant="drink"
              :opened="openId === item.id"
              :copied="copiedId === item.id"
              @toggle="toggle"
              @copy="copyItem($event, 'drink')"
            />
          </ul>
        </div>
      </section>

      <section v-show="tab === 'pantry'" class="pm-section">
        <h2 class="pm-menu-group__title pm-menu-group__title--top">Syrups & Ingredients</h2>
        <ul class="pm-list">
          <AccordionCard
            v-for="item in pantry"
            :key="item.id"
            :item="item"
            variant="pantry"
            :opened="openId === item.id"
            :copied="copiedId === item.id"
            @toggle="toggle"
            @copy="copyItem($event, 'pantry')"
          />
        </ul>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { baseFilters, drinkCategories, drinks, pantry } from './data/menu.js'
import BaseFilterAccordion from './components/BaseFilterAccordion.vue'
import AccordionCard from './components/AccordionCard.vue'
import { useClipboard } from './composables/useClipboard.js'
import { formatDrinkForTelegram, formatPantryForTelegram } from './utils/telegramFormat.js'

const tab = ref('menu') // 'menu' | 'pantry'
const openId = ref(null)
const base = ref('all')
const copiedId = ref(null)
const { copy } = useClipboard()

function toggle(id) {
  openId.value = openId.value === id ? null : id
}

async function copyItem(item, variant) {
  const text = variant === 'pantry' ? formatPantryForTelegram(item) : formatDrinkForTelegram(item)
  await copy(text)
  copiedId.value = item.id
  window.setTimeout(() => {
    if (copiedId.value === item.id) copiedId.value = null
  }, 1200)
}

const drinksByCategory = computed(() => {
  const selected = base.value

  const filtered =
    selected === 'all'
      ? drinks
      : drinks.filter(d => {
          if (Array.isArray(d.bases)) return d.bases.includes(selected)
          // fallback: не ломаемся, если bases забыли проставить
          return String(d.ingredients || '').toLowerCase().includes(selected)
        })

  return drinkCategories.map(cat => ({
    ...cat,
    items: filtered.filter(d => d.category === cat.id),
  }))
})
</script>


<style lang="scss">
.pm-app {
  min-height: 100vh;
  background: #0c0b0a;
  color: #f2ebe3;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;

  &__header {
    padding: clamp(1.25rem, 4vw, 2rem) clamp(1rem, 4vw, 2rem) 0;
    text-align: center;
  }

  &__title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.5rem, 8vw, 4rem);
    font-weight: 600;
    letter-spacing: 0.15em;
    color: #c9a227;
    margin: 0 0 0.15em;
  }

  &__tabs {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding-bottom: 0.75rem;

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

      &:hover {
        color: #f2ebe3;
        border-color: rgba(201, 162, 39, 0.6);
      }

      &.active {
        background: rgba(201, 162, 39, 0.15);
        color: #c9a227;
        border-color: #c9a227;
      }
    }
  }

  &__main {
    padding: clamp(1.25rem, 4vw, 2rem) clamp(1rem, 4vw, 2rem) clamp(2rem, 6vw, 3rem);
    max-width: 42rem;
    margin: 0 auto;
  }
}

.pm-section {
  animation: fade 0.25s ease;
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.pm-menu-group {
  margin-bottom: 2rem;

  &__title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.15rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    color: rgba(201, 162, 39, 0.95);
    margin: 1.75rem 0 0.85rem;
    padding-bottom: 0.5rem;
    text-align: center;

    &--top {
      margin-top: 0;
    }
  }

  &__volume {
    font-weight: 400;
    font-size: 0.95em;
    color: rgba(242, 235, 227, 0.6);
    letter-spacing: 0.04em;
  }
}

.pm-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
</style>
