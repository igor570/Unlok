import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore(
  'auth',
  () => {
    //TODO set to false for prod
    const signedIn = ref<boolean>(true)
    const token = ref('')

    const updateSignIn = (bool: boolean) => (signedIn.value = bool)
    const setToken = (tokenString: string) => (token.value = tokenString)

    return { signedIn, updateSignIn, setToken } as const
  },
  {
    persist: {
      storage: localStorage,
      pick: ['token'],
    },
  },
)
