<script setup lang="ts">
import { useGetMessage } from '@/composables'

const { id } = defineProps<{ id: string }>()

const { data, isLoading, error } = useGetMessage(id)
</script>

<template>
  <div>Download Page</div>
</template>

<style scoped></style>
