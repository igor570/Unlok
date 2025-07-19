import { baseURL } from '@/consts'
import type { GetMessageResponse, Message } from '@/types'
import { useQuery } from '@tanstack/vue-query'

export const getMessage = async (id: string) => {
  if (!id) throw new Error('id is required to get message')

  try {
    const res = await fetch(`${baseURL}/message/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      const error = await res.text()
      throw new Error(error || 'Failed to get message')
    }

    const data: GetMessageResponse = await res.json()

    return data
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : String(e))
  }
}

export const useGetMessage = (id: string) => {
  return useQuery({
    queryKey: ['messageId', id],
    queryFn: () => getMessage(id),
    enabled: !!id,
  })
}
