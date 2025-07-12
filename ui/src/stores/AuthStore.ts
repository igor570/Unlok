import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import type { User } from '@/types'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const router = useRouter()

    //TODO set to false for prod

    //State
    const user = ref<User>()
    const loggedIn = ref<boolean>(false)
    const token = ref('')

    //Actions
    const setUser = (data: User) => (user.value = data)

    const setLoggedIn = (bool: boolean) => (loggedIn.value = bool)

    const setToken = (tokenString: string) => (token.value = tokenString)

    const logout = () => {
      token.value = ''
      loggedIn.value = false
      router.push('/')
    }

    return { user, loggedIn, setUser, setLoggedIn, setToken, logout } as const
  },
  {
    persist: {
      storage: localStorage,
      pick: ['token'],
    },
  },
)
