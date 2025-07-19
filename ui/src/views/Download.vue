<script setup lang="ts">
import { Spinner, DownloadForm } from '@/components'
import { useGetMessage } from '@/composables'
import { computed, ref } from 'vue'

const props = defineProps<{ id: string }>()
const idRef = computed(() => props.id)

const downloadFormRef = ref<InstanceType<typeof DownloadForm>>()

const downloadFormRefGivenPassword = computed(() => downloadFormRef.value?.givenPassword ?? '')
const downloadedFormCriteraMet = computed(() => downloadFormRef.value?.criteraMet ?? false)

const { data, isLoading, error } = useGetMessage(idRef, downloadFormRefGivenPassword.value)
</script>

<template>
  <div v-if="error" class="error">{{ error.message }}</div>
  <div v-if="isLoading">
    <Spinner />
  </div>

  <div>Download Page</div>

  <section class="message-meet-critera">
    <div>Please input the password to see the message</div>
    <DownloadForm ref="downloadFormRef" />
  </section>
  <section class="message-content" v-if="downloadedFormCriteraMet">
    <div class="subject">{{ data?.subject }}</div>
    <div class="message">{{ data?.message }}</div>
  </section>
</template>

<style scoped>
.message,
.subject,
.error,
.message-meet-critera {
  color: white;
}

.emoji-inputs {
  display: flex;
  gap: 0.5rem;
  padding: 2px;
  margin-bottom: 1rem;
}
</style>
