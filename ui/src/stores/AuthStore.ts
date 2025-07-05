import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const signedIn = ref<boolean>(false)
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
