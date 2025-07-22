<script setup lang="ts">
import { useForm, Field } from 'vee-validate'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { authFormSchema } from '@/types'
import { Spinner } from '@/components'
import { useCreateUser, useLoginUser } from '@/composables'
import { omit } from 'lodash'
import { useAuthStore } from '@/stores'
import { Button, FormInput } from '@/components'

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
  <form class="auth-form" @submit.prevent="onSubmit">
    <FormInput
      label="Username"
      name="username"
      type="text"
      placeholder="Enter your username..."
      :form="form"
    />

    <FormInput
      label="Password"
      name="password"
      type="password"
      placeholder="Enter password..."
      :form="form"
    />

    <FormInput
      v-if="toggleForm === 'signup'"
      label="Confirm Password"
      name="confirmedPassword"
      type="password"
      placeholder="Confirm your password..."
      :form="form"
    />

    <div v-if="toggleForm === 'signup'" class="footer-text">
      {{ footerText }}
      <span class="toggle-label" @click="toggleForm = 'login'">Login here</span>
    </div>

    <div v-if="toggleForm === 'login'" class="footer-text">
      {{ footerText }}<span class="toggle-label" @click="toggleForm = 'signup'">Signup here</span>
    </div>

    <!-- Submit -->
    <div class="button-group">
      <Button
        label="Submit"
        type="submit"
        :isPending="loginPending || signupPending"
        :form="form"
      />
      <!-- Skip Button -->
      <Button label="Skip" type="button" @click="handleSkip" />
    </div>
  </form>
</template>

<style lang="scss" scoped>
.auth-form {
  padding: 2rem 1.5rem;
  background: $background-color;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  height: fit-content();
}

.footer-text {
  color: white;
}

.toggle-label {
  color: $highlight-color;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: lighten($highlight-color, 10%);
  }
}

.button-group {
  display: flex;
  gap: 1rem;
}
</style>
