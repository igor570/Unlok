<script setup lang="ts">
import { DownloadForm, Spinner } from '@/components'
import { useEncryptMessage, useGetMessage } from '@/composables'
import { computed, ref, watch } from 'vue'
import { emojisToPassword } from '@/utils/emoji'

const props = defineProps<{ id: string }>()

const { decrypt } = useEncryptMessage()

const givenPassword = ref('')
const criteraMet = ref(false)
const decryptedMsg = ref('')

const idRef = computed(() => props.id)

const { data, isSuccess, isLoading, error } = useGetMessage(idRef, givenPassword)

watch([isSuccess, data, givenPassword], () => {
  if (isSuccess.value && data.value) {
    const result = decrypt(data.value.message, givenPassword.value)
    if (result.success) {
      criteraMet.value = true
      decryptedMsg.value = result.message || ''
    } else {
      criteraMet.value = false
      decryptedMsg.value = ''
    }
  } else {
    decryptedMsg.value = ''
    criteraMet.value = false
  }
})
</script>

<template>
  <div v-if="error" class="error">{{ error.message }}</div>
  <div v-if="isLoading">
    <Spinner />
  </div>

  <div>Download Page</div>

  <section class="message-meet-critera">
    <DownloadForm
      @submit="(val: string) => (givenPassword = val)"
      @criteraMet="(val: boolean) => (criteraMet = val)"
    />
  </section>
  <section class="message-content" v-if="criteraMet">
    <div class="subject">{{ data?.subject }}</div>
    <div class="message">{{ decryptedMsg }}</div>
  </section>
</template>

<style scoped>
.message,
.subject,
.error,
.message-meet-critera {
  color: white;
}
</style>
