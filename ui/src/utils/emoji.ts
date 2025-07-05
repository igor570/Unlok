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

// Simple XOR encryption/decryption
export const xorEncrypt = (text: string, password: string): string => {
  let result = ''
  for (let i = 0; i < text.length; i++) {
    const textChar = text.charCodeAt(i)
    const passChar = password.charCodeAt(i % password.length)
    result += String.fromCharCode(textChar ^ passChar)
  }
  return btoa(result) // Base64 encode the result
}

export const xorDecrypt = (encryptedText: string, password: string): string => {
  try {
    const decoded = atob(encryptedText) // Base64 decode first
    let result = ''
    for (let i = 0; i < decoded.length; i++) {
      const encChar = decoded.charCodeAt(i)
      const passChar = password.charCodeAt(i % password.length)
      result += String.fromCharCode(encChar ^ passChar)
    }
    return result
  } catch (e) {
    throw new Error('Invalid encrypted text or password')
  }
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
  password: string,
): {
  encryptedMessage: string
  passwordEmojis: string
  originalPassword: string
} => {
  const encryptedMessage = xorEncrypt(message, password)
  const passwordEmojis = passwordToEmojis(password)

  return {
    encryptedMessage,
    passwordEmojis,
    originalPassword: password,
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
    const password = emojisToPassword(inputEmojis)
    const decryptedMessage = xorDecrypt(encryptedMessage, password)

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

// Example usage
console.log('=== Encryption Example ===')
const originalMessage = 'This is a secret message!'
const password = 'hello123'

console.log('Original message:', originalMessage)
console.log('Password:', password)

const encrypted = encryptMessage(originalMessage, password)
console.log('Encrypted message:', encrypted.encryptedMessage)
console.log('Password as emojis:', encrypted.passwordEmojis)

console.log('\n=== Decryption Example ===')
console.log('Encrypted message:', encrypted.encryptedMessage)
console.log('User inputs emojis:', encrypted.passwordEmojis)

const decrypted = decryptMessage(encrypted.encryptedMessage, encrypted.passwordEmojis)
if (decrypted.success) {
  console.log('Decrypted message:', decrypted.message)
} else {
  console.log('Error:', decrypted.error)
}
