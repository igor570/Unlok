<script setup lang="ts">
import Spinner from '@/components/Spinner/Spinner.vue'
import { useGetMessage } from '@/composables'

const { id } = defineProps<{ id: string }>()

const { data, isLoading, error } = useGetMessage(id)
</script>

<template>
  <div v-if="error">{{ error.message }}</div>
  <div v-if="isLoading">
    <Spinner />
  </div>

  <div>Download Page</div>
  <div class="subject">{{ data?.subject }}</div>
  <div class="message">{{ data?.message }}</div>
</template>

<style scoped>
.message,
.subject {
  color: white;
}
</style>
