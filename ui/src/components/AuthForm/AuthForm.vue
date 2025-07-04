<script setup lang="ts">
import { useForm, Field } from 'vee-validate'
import { authFormSchema } from '@/types/auth'
import { computed } from 'vue'

const form = useForm({
  validationSchema: authFormSchema,
})

const errors = computed(() => form.errors.value)
const values = computed(() => form.values)

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})
</script>

<template>
  <form class="auth-form" @submit="onSubmit">
    <!-- Username Field -->
    <div class="form-group">
      <label for="username">Username</label>
      <Field
        id="username"
        name="username"
        type="text"
        placeholder="Enter your username..."
        v-model="values.username"
      />
      <div class="description">This is your public display name.</div>
      <div class="error" v-if="errors.username">{{ errors.username }}</div>
    </div>
    <!-- Password Field -->
    <div class="form-group">
      <label for="password">Password</label>
      <Field
        id="password"
        name="password"
        type="password"
        placeholder="Enter your Password..."
        v-model="values.password"
      />
      <div class="description">Must be at least 8 characters.</div>
      <div class="error" v-if="errors.password">{{ errors.password }}</div>
    </div>
    <!-- Confirm Password field -->
    <div class="form-group">
      <label for="confirmedPassword">Confirm Password</label>
      <Field
        id="confirmedPassword"
        name="confirmedPassword"
        type="password"
        placeholder="Enter your username..."
        v-model="values.confirmedPassword"
      />
      <div class="description">Please re-enter your password.</div>
      <div class="error" v-if="errors.confirmedPassword">{{ errors.confirmedPassword }}</div>
    </div>
    <button class="submit-btn" type="submit">Submit</button>
  </form>
</template>

<style>
.auth-form {
  min-width: 500px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
label {
  font-weight: 500;
  margin-bottom: 0.2rem;
}
input {
  padding: 0.5rem 0.7rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
}
input:focus {
  border-color: #6366f1;
}
.description {
  font-size: 0.85rem;
  color: #6b7280;
}
.error {
  color: #dc2626;
  font-size: 0.85rem;
  margin-top: 0.1rem;
}
.submit-btn {
  margin-top: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.submit-btn:hover {
  background: #4f46e5;
}
</style>
