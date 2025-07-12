import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export interface UserDetails {
  username: string
  password: string
  confirmedPassword?: string
}

export interface LoginAPIResponse {
  id: string
  username: string
  profilePhoto: string
  token: string
  error?: string
}

export interface SignupAPIResponse {
  error: string
}

export const authFormSchema = toTypedSchema(
  z
    .object({
      username: z.string().min(2).max(50),
      password: z.string().min(8),
      confirmedPassword: z.string().optional(),
      mode: z.enum(['login', 'signup']).optional(),
    })
    .superRefine((data, ctx) => {
      if (data.mode === 'signup') {
        if (!data.confirmedPassword || data.confirmedPassword.length < 8) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Confirm password is required and must be at least 8 characters',
            path: ['confirmedPassword'],
          })
        }
        if (data.password !== data.confirmedPassword) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Passwords do not match',
            path: ['confirmedPassword'],
          })
        }
      }
    }),
)
