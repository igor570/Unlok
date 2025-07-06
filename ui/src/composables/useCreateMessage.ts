import type { Message } from '@/types'
import { useMutation } from '@tanstack/vue-query'

const baseURL = import.meta.env.VITE_API_URL

export const createMessage = async (formData: Message) => {
  const { identifier, subject, message } = formData

  if (!identifier || !subject || !message) throw new Error('All fields required')

  try {
    const res = await fetch(`${baseURL}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, subject, message }),
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

export const useCreateMessage = () => {
  return useMutation({
    mutationFn: ({ identifier, subject, message }: Message) =>
      createMessage({ identifier, subject, message }),
  })
}
