<script setup lang="ts">
import type { FormContext } from 'vee-validate'
import { computed } from 'vue'
import Spinner from '@/components/Spinner/Spinner.vue'

const props = defineProps<{
  label: string
  type: 'button' | 'submit' | 'reset'
  isPending?: boolean
  form?: FormContext
}>()

const isPending = computed(() => props.isPending)
</script>

<template>
  <button :type="props.type" class="base button" :class="{ loading: isPending }">
    <Spinner v-if="isPending" :size="16" />
    <span v-else>{{ props.label }}</span>
  </button>
</template>

<style lang="scss" scoped>
.base {
  color: inherit;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  transition: all 0.2s ease;
}

.button {
  border: 1px solid $border-color;
  background-color: $background-color;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px; // ensures consistent height when showing spinner

  &:hover:not(:disabled) {
    background-color: $background-hover-color;
  }

  &:disabled,
  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &.loading {
    opacity: 0.8;
    cursor: wait;
  }
}
</style>
