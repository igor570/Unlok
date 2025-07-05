import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const router = useRouter()

    //TODO set to false for prod

    //State
    const signedIn = ref<boolean>(true)
    const token = ref('')

    //Actions
    const updateSignIn = (bool: boolean) => (signedIn.value = bool)

    const setToken = (tokenString: string) => (token.value = tokenString)

    const logout = () => {
      token.value = ''
      signedIn.value = false
      router.push('/')
    }

    return { signedIn, updateSignIn, setToken, logout } as const
  },
  {
    persist: {
      storage: localStorage,
      pick: ['token'],
    },
  },
)
