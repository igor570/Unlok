<script setup lang="ts">
import { useForm } from 'vee-validate'
import Spinner from '@/components/Spinner/Spinner.vue'

const props = defineProps<{
  label: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
}>()

// Get form state if the button is inside a vee-validate form
const form = useForm()
const isSubmitting = form?.isSubmitting || false
const isFormValid = form?.meta.value.valid || true

// Show loading if manually set or if submitting
const showLoading = props.loading || (isSubmitting && props.type === 'submit')
</script>

<template>
  <button
    :type="props.type || 'submit'"
    :disabled="
      props.disabled || (props.type === 'submit' && (!isFormValid || isSubmitting)) || props.loading
    "
    class="base button"
    :class="{
      loading: showLoading,
      disabled: props.disabled || (props.type === 'submit' && !isFormValid),
    }"
  >
    <Spinner v-if="showLoading" :size="16" />
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
