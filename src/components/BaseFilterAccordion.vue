
<template>
  <div ref="rootEl" class="pm-filter">
    <div class="pm-filter__controls">
      <button
        type="button"
        class="pm-filter__trigger"
        :class="{ 'pm-filter__trigger--floated': open || modelValue !== 'all' }"
        :aria-expanded="open"
        aria-haspopup="listbox"
        @click="toggle"
      >
        <span class="pm-filter__value">{{ label }}</span>
        <span class="pm-filter__chev" :class="{ 'pm-filter__chev--open': open }">▾</span>
      </button>

      <button type="button" class="pm-filter__reset" :disabled="modelValue === 'all'" @click="set('all')">
        Сбросить
      </button>
    </div>

    <div v-show="open" class="pm-filter__panel" role="listbox" aria-label="Основа напитка">
      <button
        type="button"
        class="pm-filter__option"
        :class="{ 'pm-filter__option--active': modelValue === 'all' }"
        @click="set('all')"
      >
        Все напитки
      </button>
      <button
        v-for="f in options"
        :key="f.id"
        type="button"
        class="pm-filter__option"
        :class="{ 'pm-filter__option--active': modelValue === f.id }"
        @click="set(f.id)"
      >
        {{ f.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  modelValue: { type: String, required: true },
  options: { type: Array, required: true }, // [{ id, label }]
})

const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const rootEl = ref(null)

const label = computed(() => {
  if (props.modelValue === 'all') return 'Все напитки'
  return props.options.find(o => o.id === props.modelValue)?.label ?? 'Все напитки'
})

function set(id) {
  emit('update:modelValue', id)
  open.value = false
}

function toggle() {
  open.value = !open.value
}

function close() {
  open.value = false
}

function onGlobalPointerDown(e) {
  if (!open.value) return
  const el = rootEl.value
  if (!el) return
  if (el.contains(e.target)) return
  close()
}

function onGlobalKeyDown(e) {
  if (e.key === 'Escape') close()
}

onMounted(() => {
  window.addEventListener('pointerdown', onGlobalPointerDown)
  window.addEventListener('keydown', onGlobalKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('pointerdown', onGlobalPointerDown)
  window.removeEventListener('keydown', onGlobalKeyDown)
})
</script>


<style scoped lang="scss">
.pm-filter {
  margin: 0 0 1.25rem;
  padding: 1rem 1.1rem;
  background: rgba(26, 24, 22, 0.6);
  border: 1px solid rgba(201, 162, 39, 0.18);
  border-radius: 6px;

  &__controls {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.75rem;
    align-items: end;
  }

  &__trigger {
    width: 100%;
    border-radius: 8px;
    border: 1px solid rgba(201, 162, 39, 0.35);
    background: linear-gradient(180deg, rgba(26, 24, 22, 0.9), rgba(16, 14, 12, 0.9));
    color: rgba(242, 235, 227, 0.9);
    padding: 0.5rem 0.85rem 0.5rem;
    cursor: pointer;
    text-align: left;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    transition: border-color 0.2s, box-shadow 0.2s;
    position: relative;

    &:focus-visible {
      outline: none;
      border-color: rgba(201, 162, 39, 0.7);
      box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.15);
    }

    &--floated {
      .pm-filter__label {
        top: -0.55rem;
        transform: scale(0.86);
        font-size: 0.82rem;
        padding: 0 0.35rem;
        background: rgba(26, 24, 22, 0.9);
        color: rgba(201, 162, 39, 0.9);
      }
    }
  }

  &__value {
    font-size: 0.98rem;
    letter-spacing: 0.01em;
  }

  &__chev {
    color: rgba(201, 162, 39, 0.85);
    transition: transform 0.2s ease;
    font-size: 1.1rem;

    &--open {
      transform: rotate(180deg);
    }
  }

  &__panel {
    margin-top: 0.6rem;
    padding: 0.4rem;
    border-radius: 10px;
    border: 1px solid rgba(201, 162, 39, 0.25);
    background: rgba(14, 13, 12, 0.96);
    display: grid;
    gap: 0.25rem;
  }

  &__option {
    width: 100%;
    text-align: left;
    border-radius: 8px;
    border: 1px solid transparent;
    background: transparent;
    color: rgba(242, 235, 227, 0.85);
    padding: 0.55rem 0.7rem;
    cursor: pointer;
    letter-spacing: 0.01em;
    transition: background 0.15s, border-color 0.15s, color 0.15s;

    &:hover {
      background: rgba(201, 162, 39, 0.08);
    }

    &--active {
      border-color: rgba(201, 162, 39, 0.45);
      background: rgba(201, 162, 39, 0.14);
      color: #c9a227;
    }
  }

  &__reset {
    border-radius: 8px;
    border: 1px solid rgba(201, 162, 39, 0.35);
    background: transparent;
    color: rgba(242, 235, 227, 0.8);
    padding: 0.65rem 0.9rem;
    font-size: 0.9rem;
    letter-spacing: 0.03em;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s, background 0.2s, opacity 0.2s;

    &:hover {
      border-color: rgba(201, 162, 39, 0.6);
      color: #f2ebe3;
    }

    &:disabled {
      opacity: 0.4;
      cursor: default;
    }
  }

  @media (max-width: 420px) {
    &__controls {
      grid-template-columns: 1fr;
      align-items: stretch;
    }
  }
}
</style>

