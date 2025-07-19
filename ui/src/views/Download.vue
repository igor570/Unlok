<script setup lang="ts">
import { DownloadForm } from '@/components'
// import { useGetMessage } from '@/composables'
import { computed, ref, watch } from 'vue'

const props = defineProps<{ id: string }>()
const idRef = computed(() => props.id)

const givenPassword = ref('')
const criteraMet = ref(false)

watch(givenPassword, () => {
  console.log('PWD from the form!: ', givenPassword.value)
})

// const { data, isLoading, error } = useGetMessage(idRef, givenPassword.value)
</script>

<template>
  <!-- <div v-if="error" class="error">{{ error.message }}</div>
  <div v-if="isLoading">
    <Spinner />
  </div> -->

  <div>Download Page</div>

  <section class="message-meet-critera">
    <DownloadForm
      @submit="(val: string) => (givenPassword = val)"
      @criteraMet="(val: boolean) => (criteraMet = val)"
    />
  </section>
  <section class="message-content" v-if="criteraMet">
    <!-- <div class="subject">{{ data?.subject }}</div>
    <div class="message">{{ data?.message }}</div> -->
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
