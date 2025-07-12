import { useQuery } from '@tanstack/vue-query'

const baseURL = import.meta.env.VITE_API_URL

export const getMessage = async (id: string | number) => {
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

    //TODO: expecting message to be returned here
    const data = await res.json()
    return data
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : String(e))
  }
}

export const useGetMessage = (id: string | number) => {
  return useQuery({
    queryKey: ['messageId', id],
    queryFn: () => getMessage(id),
  })
}
