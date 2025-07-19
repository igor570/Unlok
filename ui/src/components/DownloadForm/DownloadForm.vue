<script setup lang="ts">
import { computed, ref } from 'vue'

const hasPasswordSupplied = ref(false)
const isPasswordCorrect = ref(false)

const emoji1 = ref('')
const emoji2 = ref('')
const emoji3 = ref('')
const emoji4 = ref('')

const criteraMet = computed(() => hasPasswordSupplied && isPasswordCorrect)
const givenPassword = computed(() => `${emoji1.value}${emoji2.value}${emoji3.value}${emoji4.value}`)

defineExpose({
  criteraMet,
  givenPassword,
})

function onEmojiSubmit() {
  hasPasswordSupplied.value = true
}
</script>

<template>
  <form @submit.prevent="onEmojiSubmit">
    <div class="emoji-inputs">
      <input v-model="emoji1" maxlength="2" placeholder="❓" />
      <input v-model="emoji2" maxlength="2" placeholder="❓" />
      <input v-model="emoji3" maxlength="2" placeholder="❓" />
      <input v-model="emoji4" maxlength="2" placeholder="❓" />
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<style scoped>
.download-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
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

.message,
.subject,
.error {
  color: white;
}

.emoji-inputs {
  display: flex;
  gap: 0.5rem;
  padding: 2px;
  margin-bottom: 1rem;
}
</style>
