import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export interface Message {
  identifier: string
  subject: string
  message: string
}

export const messageFormSchema = toTypedSchema(
  z.object({
    identifier: z.string().min(2).max(25),
    subject: z.string().min(2).max(50),
    message: z.string().min(2),
  }),
)
