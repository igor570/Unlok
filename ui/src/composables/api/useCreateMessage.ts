import { baseURL } from '@/consts'
import { useMutation } from '@tanstack/vue-query'
import type { CreateMessageResponse, MappedMessageResponse, Message } from '@/types'
import { useAuthStore } from '@/stores'
import { storeToRefs } from 'pinia'

export const createMessage = async (formData: Message) => {
  const { identifier, subject, message } = formData

  if (!identifier || !subject || !message) throw new Error('All fields required')

  const store = useAuthStore()
  const { user } = storeToRefs(store)

  try {
    const res = await fetch(`${baseURL}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: crypto.randomUUID(),
        user_id: user.value?.id ?? null,
        identifier,
        subject,
        message,
      }),
    })

    if (!res.ok) {
      const error = await res.text()
      throw new Error(error || 'Failed to create user')
    }

    const data: CreateMessageResponse = await res.json()

    //TODO: we should return the unique id for the message created
    // This will be consumed in Upload page, then passed to Complete page

    const mappedData: MappedMessageResponse = {
      messageId: data.message_id,
    }

    return mappedData
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
