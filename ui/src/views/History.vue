<script setup lang="ts">
import { useMessageHistory } from '@/composables'
import { Spinner } from '@/components'
import { useAuthStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()

const store = useAuthStore()
const { user, loggedIn } = storeToRefs(store)

if (!loggedIn.value) {
  router.push('/auth')
}

const { data, isLoading, error } = useMessageHistory(user.value?.id ?? '')
</script>

<template>
  <div v-if="error" class="error">{{ error.message }}</div>
  <div v-if="isLoading">
    <Spinner />
  </div>
  <div class="page-title">History page</div>
  <section class="message-content">
    <div v-if="data?.messages?.length">
      <div v-for="msg in data.messages" :key="msg.id" class="message-item">
        <div class="data"><strong>Subject:</strong> {{ msg.subject }}</div>
        <div class="data"><strong>Identifier:</strong> {{ msg.identifier }}</div>
        <div class="data"><strong>Message:</strong> {{ msg.message }}</div>
      </div>
    </div>
    <div v-else-if="!isLoading && !error">No messages found.</div>
  </section>
</template>

<style scoped>
.page-title,
.data {
  color: white;
}
</style>
