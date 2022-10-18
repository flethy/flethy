export class CryptoUtils {
  public static async createHmacBase64(
    algorithm: string,
    key: string,
    base: string,
  ) {
    if (typeof crypto !== 'undefined') {
      // TODO: check web crypto implementation
      // https://developers.cloudflare.com/workers/runtime-apis/web-crypto/
      // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign
      // https://nodejs.org/api/webcrypto.html

      var enc = new TextEncoder()

      const encodedKey = await crypto.subtle.importKey(
        'raw', // raw format of the key - should be Uint8Array
        enc.encode(key),
        {
          // algorithm details
          name: 'HMAC',
          hash: { name: algorithm },
        },
        false, // export = false
        ['sign', 'verify'], // what this key can do
      )

      crypto.subtle
        .importKey(
          'raw', // raw format of the key - should be Uint8Array
          enc.encode(key),
          {
            // algorithm details
            name: 'HMAC',
            hash: { name: algorithm },
          },
          false, // export = false
          ['sign', 'verify'], // what this key can do
        )
        .then((key) => {
          window.crypto.subtle
            .sign('HMAC', key, enc.encode(base))
            .then((signature) => {
              var b = new Uint8Array(signature)
              var str = Array.prototype.map
                .call(b, (x) => x.toString(16).padStart(2, '0'))
                .join('')
              console.log(str)
            })
        })

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
