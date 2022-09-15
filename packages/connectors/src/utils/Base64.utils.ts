export class Base64Utils {
  public static encode(value: string) {
    if (typeof btoa === 'function') {
      return btoa(value)
    }
    if (typeof Buffer === 'function') {
      return Buffer.from(value).toString('base64')
    }
    throw new Error(`Failed to encode.`)
  }

  public static decode(value: string) {
    if (typeof atob === 'function') {
      return atob(value)
    }
    if (typeof Buffer === 'function') {
      return Buffer.from(value, 'base64').toString('utf-8')
    }
    throw new Error(`Failed to encode.`)
  }
}
