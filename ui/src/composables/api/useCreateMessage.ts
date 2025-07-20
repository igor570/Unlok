import { baseURL } from '@/consts'
import { useMutation } from '@tanstack/vue-query'
import type { CreateMessageResponse, MappedMessageResponse, Message, UploadFormData } from '@/types'
import { useAuthStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { useEncryptMessage } from '@/composables/useEncryptMessage'

export const createMessage = async (formData: UploadFormData) => {
  const { identifier, subject, message, password } = formData

  if (!identifier || !subject || !message) throw new Error('All fields required')
  if (!password) throw new Error('Message password is needed')

  const store = useAuthStore()
  const { user } = storeToRefs(store)

  const { encrypt } = useEncryptMessage()

  // Take the users message, and encrypts it with emoji password they have set
  const { encryptedMessage } = encrypt(message, password)

  try {
    const res = await fetch(`${baseURL}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: crypto.randomUUID(),
        user_id: Number(user.value?.id) ?? null,
        identifier,
        subject,
        message: encryptedMessage,
      }),
    })

    if (!res.ok) {
      const error = await res.text()
      throw new Error(error || 'Failed to create user')
    }

    const data: CreateMessageResponse = await res.json()

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
    mutationFn: (data: UploadFormData) => createMessage(data),
  })
}
