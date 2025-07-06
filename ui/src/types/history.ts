import type { Message } from './message'

export interface MessageHistory {
  userId: string
  messages: Message[]
}
