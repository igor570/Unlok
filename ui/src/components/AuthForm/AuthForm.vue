<script setup lang="ts">
import { useForm, Field } from 'vee-validate'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { authFormSchema } from '@/types'
import { Spinner } from '@/components'
import { useCreateUser, useLoginUser } from '@/composables'

const router = useRouter()

const form = useForm({
  validationSchema: authFormSchema,
})

const { mutate: loginMutate, isPending: loginPending } = useLoginUser()
const { mutate: signupMutate, isPending: signupPending } = useCreateUser()

type FormMode = 'login' | 'signup'

const toggleForm = ref<FormMode>('signup')

const errors = computed(() => form.errors.value)
const values = computed(() => form.values)
const footerText = computed(() => {
  if (toggleForm.value === 'signup') return 'Already signed up? '
  else return 'Not signed up? '
})

const onSubmit = form.handleSubmit((values) => {
  const { username, password, confirmedPassword } = values

  if (toggleForm.value === 'login')
    loginMutate(
      { username, password },
      {
        onSuccess: () => console.log('Logged in '),
      },
    )
  if (toggleForm.value === 'signup')
    signupMutate(
      { username, password, confirmedPassword },
      {
        onSuccess: () => console.log('Signed up'),
      },
    )
  form.resetForm()
})

const handleSkip = () => router.push('/')
</script>

<template>
  <section class="auth-page">
    <form class="auth-form" @submit.prevent="onSubmit">
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
        <div class="error" v-if="errors.password">{{ errors.password }}</div>
      </div>

      <!-- Confirm Password field -->
      <Transition name="fade">
        <div class="form-group" v-if="toggleForm === 'signup'">
          <label for="confirmedPassword">Confirm Password</label>
          <Field
            id="confirmedPassword"
            name="confirmedPassword"
            type="password"
            placeholder="Enter your username..."
            v-model="values.confirmedPassword"
          />
          <div class="error" v-if="errors.confirmedPassword">{{ errors.confirmedPassword }}</div>
        </div>
      </Transition>

      <div v-if="toggleForm === 'signup'">
        {{ footerText }}<span class="toggle-label" @click="toggleForm = 'login'">Login here</span>
      </div>

      <div v-if="toggleForm === 'login'">
        {{ footerText }}<span class="toggle-label" @click="toggleForm = 'signup'">Signup here</span>
      </div>
      <!-- Submit -->
      <div class="button-group">
        <button class="submit-btn" type="submit">
          <Spinner :size="25" v-if="loginPending || signupPending" />
          <span>Submit</span>
        </button>
        <!-- Skip Button -->
        <button class="submit-btn-ghost" @click="handleSkip">Skip</button>
      </div>
    </form>
  </section>
</template>

<style lang="scss" scoped>
.auth-form {
  padding: 2rem 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 400px;
  transition:
    min-height 0.3s,
    padding 0.3s;
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
.button-group {
  display: flex;
  gap: 1rem;
}

.btn-common {
  flex: 1;
  margin-top: 0.5rem;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-btn {
  @extend .btn-common;
  background: #6366f1;
  color: #fff;

  &:hover {
    background: #4f46e5;
  }

  &-ghost {
    @extend .btn-common;
    background-color: transparent;
    border: 1px solid #6366f1;

    &:hover {
      background: #dad8ff;
    }
  }
}

.toggle-label {
  color: rgb(76, 76, 216);

  &:hover {
    cursor: pointer;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
