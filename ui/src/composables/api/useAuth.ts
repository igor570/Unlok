import { useMutation } from '@tanstack/vue-query'
import { baseURL } from '@/consts'
import { useAuthStore } from '@/stores/AuthStore'
import type { SignUpResponse, LoginResponse, UserDetails } from '@/types'

const createUser = async ({
  username,
  password,
  confirmedPassword,
}: UserDetails): Promise<SignUpResponse> => {
  if (!password || !confirmedPassword || !username) {
    throw new Error('Fields cannot be empty')
  }

  if (password !== confirmedPassword) {
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
}: Omit<UserDetails, 'confirmedPassword'>): Promise<LoginResponse> => {
  if (!password || !username) throw new Error('Fields cannot be empty')

  const store = useAuthStore()

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

    if (data.token) store.setToken(data.token)

    return data
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : String(e))
  }
}

export const useLoginUser = () => {
  return useMutation({
    mutationFn: ({ username, password }: Omit<UserDetails, 'confirmedPassword'>) =>
      loginUser({ username, password }),
  })
}

export const useCreateUser = () => {
  return useMutation({
    mutationFn: ({ username, password, confirmedPassword }: UserDetails) =>
      createUser({ username, password, confirmedPassword }),
  })
}
