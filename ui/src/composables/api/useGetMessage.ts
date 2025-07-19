import { baseURL } from '@/consts'
import type { GetMessageResponse, Message } from '@/types'
import { useQuery } from '@tanstack/vue-query'
import { toValue, type MaybeRefOrGetter } from 'vue'

export const getMessage = async (id: MaybeRefOrGetter<string>, givenPassword: string) => {
  const idParam = toValue(id)
  if (!id) throw new Error('id is required to get message')

  try {
    const res = await fetch(`${baseURL}/message/${idParam}`, {
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

export const useGetMessage = (id: MaybeRefOrGetter<string>, givenPassword: string) => {
  return useQuery({
    queryKey: ['messageId', id],
    queryFn: () => getMessage(id, givenPassword),
    enabled: !!id && !!givenPassword && givenPassword.length >= 4,
  })
}
