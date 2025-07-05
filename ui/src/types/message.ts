import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export interface Message {
  subject: string
  message: string
}

export const messageFormSchema = toTypedSchema(
  z.object({
    subject: z.string().min(2).max(50),
    message: z.string().min(2),
  }),
)
