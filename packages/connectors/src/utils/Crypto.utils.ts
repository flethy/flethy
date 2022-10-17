export class CryptoUtils {
  public static createHmacBase64(algorithm: string, key: string, base: string) {
    if (typeof crypto !== 'undefined') {
      // TODO: check web crypto implementation
      // https://developers.cloudflare.com/workers/runtime-apis/web-crypto/
      // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign
      // https://nodejs.org/api/webcrypto.html
      throw new Error(`CryptoUtils | To be implemented with WebCrypto.`)
    } else {
      try {
        const crypto = require('crypto')
        return crypto.createHmac(algorithm, key).update(base).digest('base64')
      } catch (error) {
        throw new Error(`CryptoUtils | Failed to load module 'crypto'.`)
      }
    }
  }
}
