<script setup lang="ts">
import { useForm, Field } from 'vee-validate'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { authFormSchema } from '@/types'
import { Spinner } from '@/components'
import { useCreateUser, useLoginUser } from '@/composables'
import { omit } from 'lodash'
import { useAuthStore } from '@/stores'

const router = useRouter()

const store = useAuthStore()
const { setUser, setLoggedIn } = store

const { mutateAsync: loginMutateAsync, isPending: loginPending } = useLoginUser()
const { mutateAsync: signupMutateAsync, isPending: signupPending } = useCreateUser()

const form = useForm({
  validationSchema: authFormSchema,
})

type FormMode = 'login' | 'signup'
const toggleForm = ref<FormMode>('signup')

const footerText = computed(() => {
  if (toggleForm.value === 'signup') return 'Already signed up? '
  else return 'Not signed up? '
})

const onSubmit = form.handleSubmit(async (values) => {
  const mode = toggleForm.value

  if (mode === 'login') {
    const result = await loginMutateAsync(omit(values, ['confirmedPassword']))
    if (result) {
      const { id, username, profilePhoto } = result
      // use this pinia data across the app when its set
      setUser({ id, username, profilePhoto })
    }
    setLoggedIn(true)
    router.push('/upload')
  }
  if (mode === 'signup') {
    await signupMutateAsync(values)
    toggleForm.value = 'login'
  }

  form.setFieldValue('mode', mode)
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
        <Field id="username" name="username" type="text" placeholder="Enter your username..." />
        <div class="error" v-if="form.errors.value.username">{{ form.errors.value.username }}</div>
      </div>

      <!-- Password Field -->
      <div class="form-group">
        <label for="password">Password</label>
        <Field id="password" name="password" type="password" placeholder="Enter your Password..." />
        <div class="error" v-if="form.errors.value.password">{{ form.errors.value.password }}</div>
      </div>

      <!-- Confirm Password field -->
      <Transition name="fade">
        <div class="form-group" v-if="toggleForm === 'signup'">
          <label for="confirmedPassword">Confirm Password</label>
          <Field
            id="confirmedPassword"
            name="confirmedPassword"
            type="password"
            placeholder="Confirm your password..."
          />
          <div class="error" v-if="form.errors.value.confirmedPassword">
            {{ form.errors.value.confirmedPassword }}
          </div>
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
