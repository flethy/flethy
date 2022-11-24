import { HMACSHA1Base64 } from './HMAC-SHA1.utils'
import { HMACSHA256Base64 } from './HMAC-SHA256.utils'
import { MD5Utils } from './MD5.utils'

export class CryptoUtils {
  public static createHmacBase64(algorithm: string, key: string, base: string) {
    switch (algorithm) {
      case 'sha256':
        return HMACSHA256Base64(key, base)
      case 'sha1':
        return HMACSHA1Base64(key, base)
      default:
        throw new Error(`Unsupported algorithm: ${algorithm}`)
    }
  }

  public static createMD5(inputString: string) {
    return MD5Utils.createMD5(inputString)
  }
}
