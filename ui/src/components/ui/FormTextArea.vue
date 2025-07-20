<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps<{
  label: string
  name: string
  placeholder?: string
  rules?: any
}>()

const { value, errorMessage, handleBlur, handleChange, meta } = useField(props.name, props.rules, {
  initialValue: '',
})
</script>

<template>
  <label class="textarea-wrapper">
    {{ label }}
    <textarea
      :name="props.name"
      :value="value"
      :placeholder="placeholder"
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

.textarea-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  color: white;
  font-size: 14px;
}

textarea {
  border: 1px solid $border-color;
  background-color: $background-color;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  min-height: 80px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: 2px solid lighten($border-color, 10%);
  }

  &.error {
    border-color: lighten($border-color, 20%);
  }

  &.valid {
    border-color: darken($border-color, 10%); // or whatever success color you prefer
  }
}

.error-message {
  color: lighten($border-color, 30%);
  font-size: 12px;
  margin-top: 0.25rem;
}
</style>
