import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export interface UploadFormData {
  identifier: string
  subject: string
  message: string
  password: string
}

export interface Message {
  identifier: string
  subject: string
  message: string
}

export interface GetMessageResponse {
  id: string
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
    password: z.string().min(4).max(8),
  }),
)

export const passwordFormSchema = toTypedSchema(
  z.object({
    emoji1: z.string().min(1, 'Required').emoji('Must be an emoji'),
    emoji2: z.string().min(1, 'Required').emoji('Must be an emoji'),
    emoji3: z.string().min(1, 'Required').emoji('Must be an emoji'),
    emoji4: z.string().min(1, 'Required').emoji('Must be an emoji'),
  }),
)
