import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const router = useRouter()

    //TODO set to false for prod

    //State
    const loggedIn = ref<boolean>(false)
    const token = ref('')

    //Actions
    const setLoggedIn = (bool: boolean) => (loggedIn.value = bool)

    const setToken = (tokenString: string) => (token.value = tokenString)

    const logout = () => {
      token.value = ''
      loggedIn.value = false
      router.push('/')
    }

    return { loggedIn, setLoggedIn, setToken, logout } as const
  },
  {
    persist: {
      storage: localStorage,
      pick: ['token'],
    },
  },
)
