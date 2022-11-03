export class CryptoUtils {
  public static createHmacBase64(algorithm: string, key: string, base: string) {
    if (typeof crypto !== 'undefined') {
      // TODO: check web crypto implementation
      // https://developers.cloudflare.com/workers/runtime-apis/web-crypto/
      // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign
      // https://nodejs.org/api/webcrypto.html
      // https://stackoverflow.com/questions/47329132/how-to-get-hmac-with-crypto-web-api

      // *******************
      // const enc = new TextEncoder()

      // const thisAlgorithm =
      //   algorithm === 'sha256' ? { name: 'HMAC', hash: 'SHA-256' } : undefined
      // if (!thisAlgorithm) {
      //   throw new Error(`CryptoUtils | Algorithm ${algorithm} not supported`)
      // }

      // const importKey = await crypto.subtle.importKey(
      //   'raw',
      //   enc.encode(key),
      //   thisAlgorithm,
      //   false,
      //   ['sign', 'verify'],
      // )
      // const signature = await crypto.subtle.sign(
      //   thisAlgorithm.name,
      //   importKey,
      //   enc.encode(base),
      // )
      // const digest = btoa(String.fromCharCode(...new Uint8Array(signature)))
      // return digest
      // *******************
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
