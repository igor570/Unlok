import { useMutation, useQuery } from '@tanstack/vue-query'
import { useAuthStore } from '@/stores/AuthStore'
import type { SignUpResponse, LoginResponse, UserDetails } from '@/types'

const store = useAuthStore()
const { setToken } = store

const baseURL = 'http://localhost:8080'

const createUser = async ({
  username,
  password,
  confirmPassword,
}: UserDetails): Promise<SignUpResponse> => {
  if (!password || !confirmPassword || !username) {
    throw new Error('Fields cannot be empty')
  }

  if (password !== confirmPassword) {
    throw new Error('Passwords do not match')
  }

  try {
    const res = await fetch(`${baseURL}/auth/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })

    if (!res.ok) {
      const error = await res.text()
      throw new Error(error || 'Failed to create user')
    }

    const data = await res.json()
    return data
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : String(e))
  }
}

const loginUser = async ({
  username,
  password,
}: Omit<UserDetails, 'confirmPassword'>): Promise<LoginResponse> => {
  if (!password || !username) throw new Error('Fields cannot be empty')

  try {
    const res = await fetch(`${baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })

    if (!res.ok) {
      const error = await res.text()
      throw new Error(error || 'Failed to login')
    }

    const data: LoginResponse = await res.json()

    if (data.token) setToken(data.token)

    return data
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : String(e))
  }
}

export const useLoginUser = ({ username, password }: Omit<UserDetails, 'confirmPassword'>) => {
  return useQuery({
    queryKey: ['loginUser'],
    queryFn: () => loginUser({ username, password }),
  })
}

export const useCreateUser = () => {
  return useMutation({
    mutationFn: ({ username, password, confirmPassword }: UserDetails) =>
      createUser({ username, password, confirmPassword }),
  })
}
