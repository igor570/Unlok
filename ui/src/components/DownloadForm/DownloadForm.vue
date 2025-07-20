<script setup lang="ts">
import { computed, ref } from 'vue'
import { passwordFormSchema } from '@/types'
import { useForm, Field } from 'vee-validate'

interface DownloadFormEmits {
  submit: [password: string]
  criteraMet: [boolean]
}

const emits = defineEmits<DownloadFormEmits>()

const form = useForm({
  validationSchema: passwordFormSchema,
})

const emoji1 = ref('')
const emoji2 = ref('')
const emoji3 = ref('')
const emoji4 = ref('')

const givenPassword = computed(() => `${emoji1.value}${emoji2.value}${emoji3.value}${emoji4.value}`)

async function onEmojiSubmit() {
  const result = await form.validate()
  if (result.valid) {
    emits('criteraMet', true)
    emits('submit', givenPassword.value)
  }
}
</script>

<template>
  <form class="download-form" @submit.prevent="onEmojiSubmit">
    <div>Please input the password to see the message</div>
    <div class="emoji-inputs">
      <Field name="emoji1" v-model="emoji1" maxlength="2" placeholder="❓" as="input" />
      <Field name="emoji2" v-model="emoji2" maxlength="2" placeholder="❓" as="input" />
      <Field name="emoji3" v-model="emoji3" maxlength="2" placeholder="❓" as="input" />
      <Field name="emoji4" v-model="emoji4" maxlength="2" placeholder="❓" as="input" />
    </div>
    <div class="error" v-if="form.errors.value.emoji1">{{ form.errors.value.emoji1 }}</div>
    <div class="error" v-if="form.errors.value.emoji2">{{ form.errors.value.emoji2 }}</div>
    <div class="error" v-if="form.errors.value.emoji3">{{ form.errors.value.emoji3 }}</div>
    <div class="error" v-if="form.errors.value.emoji4">{{ form.errors.value.emoji4 }}</div>
    <button type="submit">Submit</button>
  </form>
</template>

<style scoped>
.download-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: #222;
  border-radius: 8px;
}
label {
  color: #fff;
  font-weight: 500;
}
input {
  padding: 0.5rem 0.7rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
  width: 50px;
}
input:focus {
  border-color: #6366f1;
}
button {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  background: #6366f1;
  color: #fff;
  transition: background 0.2s;
}

button:hover {
  background: #4f46e5;
}

.error {
  color: rgb(224, 88, 88);
}

.message,
.subject {
  color: white;
}

.emoji-inputs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>
