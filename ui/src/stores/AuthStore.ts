import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const signedIn = ref<boolean>(false)
    //TODO: add token from api call
    const token = ref()

    const updateSignIn = () => (signedIn.value = !signedIn.value)

    return { signedIn, updateSignIn } as const
  },
  {
    persist: {
      storage: localStorage,
      pick: ['token'],
    },
  },
)
