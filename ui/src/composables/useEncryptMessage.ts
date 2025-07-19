import { encryptMessage, decryptMessage, passwordToEmojis, emojisToPassword } from '@/utils'

export const useEncryptMessage = () => {
  // Encrypt a message and get emoji password
  const encrypt = (message: string, password: string) => {
    return encryptMessage(message, password)
  }

  // Decrypt a message using emoji password
  const decrypt = (encryptedMessage: string, emojiPassword: string) => {
    return decryptMessage(encryptedMessage, emojiPassword)
  }

  // Convert password to emojis
  const toEmojis = (password: string) => passwordToEmojis(password)

  // Convert emojis back to password
  const fromEmojis = (emojiString: string) => emojisToPassword(emojiString)

  return {
    encrypt,
    decrypt,
    toEmojis,
    fromEmojis,
  } as const
}
