import type { Message } from './message'

export interface User {
  id: string
  name: string
  email: string
}

export interface UserMessages {
  id: string
  messages: Message[]
}
