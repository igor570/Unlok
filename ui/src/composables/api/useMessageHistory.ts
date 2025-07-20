import { baseURL } from '@/consts'
import { useQuery } from '@tanstack/vue-query'
import type { MessageHistory } from '@/types'

export const getMessageHistory = async (userId: string): Promise<MessageHistory> => {
  if (!userId) throw new Error('userId is required')

  try {
    const res = await fetch(`${baseURL}/all-messages?userId=${encodeURIComponent(userId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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

export const useMessageHistory = (userId: string) => {
  return useQuery({
    queryKey: ['message-history', userId],
    queryFn: () => getMessageHistory(userId),
  })
}
