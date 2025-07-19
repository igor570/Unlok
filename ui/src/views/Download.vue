<script setup lang="ts">
import Spinner from '@/components/Spinner/Spinner.vue'
import { useGetMessage } from '@/composables'
import { computed } from 'vue'

const props = defineProps<{ id: string }>()
const idRef = computed(() => props.id)

const { data, isLoading, error } = useGetMessage(idRef)
</script>

<template>
  <div v-if="error" class="error">{{ error.message }}</div>
  <div v-if="isLoading">
    <Spinner />
  </div>

  <div>Download Page</div>
  <div class="subject">{{ data?.subject }}</div>
  <div class="message">{{ data?.message }}</div>
</template>

<style scoped>
.message,
.subject,
.error {
  color: white;
}
</style>
