<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps<{
  label: string
  name: string
  placeholder: string
  rules?: any
}>()

// Use vee-validate's useField composable
const { value, errorMessage, handleBlur, handleChange, meta } = useField(props.name, props.rules, {
  initialValue: '',
})
</script>

<template>
  <label class="input-wrapper">
    {{ props.label }}
    <input
      :name="props.name"
      :value="value"
      :placeholder="props.placeholder"
      @input="handleChange"
      @blur="handleBlur"
      :class="['base', 'input', { error: errorMessage, valid: meta.valid && meta.dirty }]"
    />
    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
  </label>
</template>

<style lang="scss" scoped>
.base {
  font: inherit;
  outline: inherit;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  color: white;
  font-size: 14px;
}

.input {
  border: 1px solid $border-color;
  background-color: $background-color;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: 2px solid lighten($border-color, 10%);
  }

  &.error {
    border-color: #ef4444;
  }

  &.valid {
    border-color: #10b981;
  }
}

.error-message {
  color: #ef4444;
  font-size: 12px;
  margin-top: 0.25rem;
}
</style>
