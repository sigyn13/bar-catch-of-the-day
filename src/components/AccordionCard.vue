<script setup>
const props = defineProps({
  item: { type: Object, required: true },
  opened: { type: Boolean, required: true },
  variant: { type: String, required: true }, // 'drink' | 'pantry'
  copied: { type: Boolean, default: false },
})

const emit = defineEmits(['toggle', 'copy'])

function onToggle() {
  emit('toggle', props.item.id)
}

function onCopy() {
  emit('copy', props.item)
}
</script>

<template>
  <li class="pm-card">
    <button type="button" class="pm-card__button" @click="onToggle">
      <span class="pm-card__top">
        <span class="pm-card__title">{{ item.name }}</span>
        <span class="pm-card__chev" :class="{ 'pm-card__chev--open': opened }">▾</span>
      </span>
      <span v-if="item.shortDescription" class="pm-card__desc">{{ item.shortDescription }}</span>
      <span class="pm-card__ingredients">{{ item.ingredients }}</span>
      <span v-if="variant === 'drink' && item.snackShort" class="pm-card__snack">
        <span class="pm-card__snack-label">Закуска:</span> {{ item.snackShort }}
      </span>
    </button>

    <div v-show="opened" class="pm-card__accordion">
      <p class="pm-card__label">Ингредиенты</p>
      <ul class="pm-card__list">
        <li v-for="(ing, i) in item.recipe.ingredients" :key="i">{{ ing }}</li>
      </ul>

      <p class="pm-card__label">Рецепт</p>
      <ol class="pm-card__steps">
        <li v-for="(step, i) in item.recipe.steps" :key="i">{{ step }}</li>
      </ol>

      <div v-if="variant === 'drink' && item.recipe.snackFull" class="pm-card__note">
        <span class="pm-card__note-title">🍴 Закуска</span>
        <p class="pm-card__note-text">{{ item.recipe.snackFull }}</p>
      </div>

      <div v-if="variant === 'pantry' && item.recipe.notes" class="pm-card__note">
        <p class="pm-card__note-text">{{ item.recipe.notes }}</p>
      </div>

      <button
        type="button"
        class="pm-card__copy"
        :aria-label="copied ? 'Скопировано' : 'Скопировать для Telegram'"
        :title="copied ? 'Скопировано' : 'Скопировать'"
        @click.stop="onCopy"
      >
        <svg class="pm-card__copy-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M16 1H6a2 2 0 0 0-2 2v12h2V3h10V1Zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H10V7h9v14Z"
          />
        </svg>
      </button>
    </div>
  </li>
</template>

<style scoped lang="scss">
.pm-card {
  padding: 1.25rem 1.5rem;
  background: rgba(26, 24, 22, 0.8);
  border: 1px solid rgba(201, 162, 39, 0.2);
  border-radius: 6px;

  &__button {
    width: 100%;
    text-align: left;
    padding: 0;
    margin: 0;
    border: none;
    background: transparent;
    color: inherit;
    cursor: pointer;
    font: inherit;
    display: grid;
    gap: 0.35rem;
  }

  &__top {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.75rem;
  }

  &__title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 600;
    color: #c9a227;
    letter-spacing: 0.04em;
  }

  &__chev {
    color: rgba(201, 162, 39, 0.8);
    transition: transform 0.2s ease;
    font-size: 1.1rem;
    line-height: 1;

    &--open {
      transform: rotate(180deg);
    }
  }

  &__desc {
    font-size: 0.9rem;
    color: rgba(242, 235, 227, 0.8);
    font-style: italic;
    margin: 0;
  }

  &__ingredients {
    font-size: 0.85rem;
    color: rgba(242, 235, 227, 0.9);
    margin: 0;
  }

  &__snack {
    font-size: 0.85rem;
    color: rgba(201, 162, 39, 0.9);
    margin: 0;
  }

  &__snack-label {
    font-weight: 500;
    margin-right: 0.35em;
  }

  &__accordion {
    margin-top: 0.9rem;
    padding-top: 0.9rem;
    border-top: 1px solid rgba(201, 162, 39, 0.2);
    position: relative;
    padding-right: 2.75rem; // место под кнопку копирования
  }

  &__label {
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    color: rgba(201, 162, 39, 0.9);
    margin: 0.6em 0 0.35em;

    &:first-child {
      margin-top: 0;
    }
  }

  &__list {
    list-style: none;
    margin: 0 0 0.75em;
    padding: 0;
    font-size: 0.9rem;
    color: rgba(242, 235, 227, 0.9);

    li {
      padding: 0.2em 0 0.2em 1em;
      position: relative;

      &::before {
        content: '·';
        position: absolute;
        left: 0;
        color: #c9a227;
      }
    }
  }

  &__steps {
    margin: 0;
    padding-left: 1.25rem;
    font-size: 0.9rem;
    color: rgba(242, 235, 227, 0.9);
    line-height: 1.55;

    li {
      margin-bottom: 0.4em;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__note {
    margin-top: 1rem;
    padding-top: 0.9rem;
    border-top: 1px solid rgba(201, 162, 39, 0.2);
  }

  &__note-title {
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    color: rgba(201, 162, 39, 0.95);
    display: block;
    margin-bottom: 0.4em;
  }

  &__note-text {
    font-size: 0.88rem;
    color: rgba(242, 235, 227, 0.85);
    line-height: 1.5;
    margin: 0;
  }

  &__copy {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(10%, 10%);
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 999px;
    border: 1px solid rgba(201, 162, 39, 0.35);
    background: rgba(201, 162, 39, 0.08);
    color: rgba(201, 162, 39, 0.95);
    display: grid;
    place-items: center;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s, color 0.2s, opacity 0.2s;

    &:hover {
      border-color: rgba(201, 162, 39, 0.6);
      background: rgba(201, 162, 39, 0.12);
    }
  }

  &__copy-icon {
    width: 1.1rem;
    height: 1.1rem;
  }
}
</style>

