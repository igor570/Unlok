import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export const authFormSchema = toTypedSchema(
  z
    .object({
      username: z.string().min(2).max(50),
      password: z.string().min(8),
      confirmedPassword: z.string().min(8),
    })
    .refine((data) => data.password === data.confirmedPassword, {
      message: 'Passwords do not match',
      path: ['confirmedPassword'],
    }),
)
