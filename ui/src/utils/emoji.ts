//TODO: Use this to test on FE, move to backend later
// Character to emoji mapping for passwords
const charToEmoji: Record<string, string> = Object.freeze({
  a: '😀',
  b: '😁',
  c: '😂',
  d: '🤣',
  e: '😃',
  f: '😄',
  g: '😅',
  h: '😆',
  i: '😉',
  j: '😊',
  k: '😋',
  l: '😎',
  m: '😍',
  n: '😘',
  o: '🥰',
  p: '😗',
  q: '😙',
  r: '😚',
  s: '🙂',
  t: '🤗',
  u: '🤩',
  v: '🤔',
  w: '🫡',
  x: '😐',
  y: '😑',
  z: '😶',
  A: '🙄',
  B: '😏',
  C: '😣',
  D: '😥',
  E: '😮',
  F: '🤐',
  G: '😯',
  H: '😪',
  I: '😫',
  J: '🥱',
  K: '😴',
  L: '😌',
  M: '😛',
  N: '😜',
  O: '😝',
  P: '🤤',
  Q: '😒',
  R: '😓',
  S: '😔',
  T: '😕',
  U: '🙃',
  V: '🫠',
  W: '😲',
  X: '🙁',
  Y: '😖',
  Z: '😞',
  '0': '😟',
  '1': '😤',
  '2': '😢',
  '3': '😭',
  '4': '😦',
  '5': '😧',
  '6': '😨',
  '7': '😩',
  '8': '🤯',
  '9': '😬',
  '!': '😰',
  '@': '😱',
  '#': '🥶',
  $: '🥵',
  '%': '😵',
  '^': '🤢',
  '&': '🤮',
  '*': '🤧',
  '(': '😷',
  ')': '🤒',
  '-': '🤕',
  _: '🤑',
  '+': '🤠',
  '=': '😈',
  '[': '👿',
  ']': '👹',
  '{': '👺',
  '}': '🤡',
  '|': '💀',
  '\\': '☠️',
  ';': '👻',
  ':': '👽',
  '"': '🤖',
  "'": '🎃',
  '<': '😺',
  '>': '😸',
  ',': '😹',
  '.': '😻',
  '?': '🙀',
  '/': '😿',
  '~': '😾',
  '`': '👶',
  ' ': '🔥',
} as const)

// Reverse mapping: emoji to character
const emojiToChar: Record<string, string> = Object.fromEntries(
  Object.entries(charToEmoji).map(([char, emoji]) => [emoji, char]),
)

// Simple password-based encryption - shift by number of emojis
export const simpleEncrypt = (text: string, password: string): string => {
  const shift = password.length // Use password length as shift amount

  const result = text
    .split('')
    .map((char) => {
      const original = char.charCodeAt(0)
      const shifted = original + shift
      const newChar = String.fromCharCode(shifted)
      return newChar
    })
    .join('')

  return result
}

export const simpleDecrypt = (encryptedText: string, emojiPassword: string): string => {
  // Count emojis directly instead of converting to characters first
  const shift = Array.from(emojiPassword).length // Count actual emojis

  const result = encryptedText
    .split('')
    .map((char) => {
      const original = char.charCodeAt(0)
      const shifted = original - shift
      const newChar = String.fromCharCode(shifted)
      return newChar
    })
    .join('')

  return result
}

// Convert password to emojis for display
export const passwordToEmojis = (password: string): string => {
  return password
    .split('')
    .map((char) => charToEmoji[char] || char)
    .join('')
}

// Convert emojis back to password text
export const emojisToPassword = (emojiString: string): string => {
  const emojiArray = Array.from(emojiString)
  return emojiArray.map((emoji) => emojiToChar[emoji] || emoji).join('')
}

// Main encryption function
export const encryptMessage = (
  message: string,
  emojiPassword: string, // Change to accept emojis directly
): {
  encryptedMessage: string
  passwordEmojis: string
  originalPassword: string
} => {
  // Count emojis directly instead of converting first
  const shift = Array.from(emojiPassword).length

  const encryptedMessage = message
    .split('')
    .map((char) => {
      const original = char.charCodeAt(0)
      const shifted = original + shift
      const newChar = String.fromCharCode(shifted)
      return newChar
    })
    .join('')

  // Convert emojis to password for storage if needed
  const originalPassword = emojisToPassword(emojiPassword)

  return {
    encryptedMessage,
    passwordEmojis: emojiPassword,
    originalPassword,
  }
}

// Main decryption function
export const decryptMessage = (
  encryptedMessage: string,
  inputEmojis: string,
): {
  success: boolean
  message?: string
  error?: string
} => {
  try {
    // Pass the emojis directly to simpleDecrypt
    const decryptedMessage = simpleDecrypt(encryptedMessage, inputEmojis)

    return {
      success: true,
      message: decryptedMessage,
    }
  } catch (error) {
    return {
      success: false,
      error: 'Decryption failed. Check your emoji password.',
    }
  }
}
