import type { Message } from './message'
import type { LoginAPIResponse } from '@/types/auth'

export type User = Pick<LoginAPIResponse, 'id' | 'username' | 'profilePhoto'>

export interface UserMessages {
  id: string
  messages: Message[]
}
