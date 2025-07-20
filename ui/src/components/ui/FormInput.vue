<script setup lang="ts">
import type { FormContext } from 'vee-validate'
import { Field } from 'vee-validate'

const props = defineProps<{
  label: string
  name: string
  placeholder: string
  form: FormContext
}>()
</script>

<template>
  <div class="form-group">
    <label :for="props.name">{{ props.label }}</label>
    <Field
      class="base input"
      :class="{
        error: props.form.errors.value[props.name],
        valid: props.form.meta.value.valid && props.form.meta.value.dirty,
      }"
      :id="props.name"
      :name="props.name"
      type="text"
      :placeholder="props.placeholder"
      :model-value="props.form.values[props.name]"
      @update:model-value="props.form.setFieldValue(props.name, $event)"
    />
    <div class="error-message" v-if="props.form.errors.value[props.name]">
      {{ props.form.errors.value[props.name] }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base {
  font: inherit;
  outline: inherit;
}

.form-group {
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
    border-color: $error-border;
  }

  &.valid {
    border-color: darken($border-color, 10%);
  }
}

.error-message {
  color: $error-text;
  font-size: 12px;
  margin-top: 0.25rem;
}
</style>
