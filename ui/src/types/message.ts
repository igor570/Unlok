import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export interface Message {
  identifier: string
  subject: string
  message: string
}

// What we receive from the API
export interface CreateMessageResponse {
  message_id: string
}

export interface MappedMessageResponse {
  messageId: string
}

export const messageFormSchema = toTypedSchema(
  z.object({
    identifier: z.string().min(2).max(25),
    subject: z.string().min(2).max(50),
    message: z.string().min(2),
  }),
)
