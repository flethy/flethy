import { Base64Utils } from './utils/Base64.utils'
import { CryptoUtils } from './utils/Crypto.utils'
import { HMACUtils } from './utils/HMAC.utils3'
import { base64ArrayBuffer, hmac } from './utils/HMAC.utils'

function main() {
  const key = 'testkey'
  const value = 'testvalue'

  const crypto = CryptoUtils.createHmacBase64('sha256', key, value)
  console.log(`====================================`)
  console.log(`crypto: ${crypto}`)

  const hmacUtils = new HMACUtils()
  const ownSigned = hmacUtils.sign(key, value)
  const ownHash = hmacUtils.hash(ownSigned)
  const ownHash2 = hmacUtils.hash2(ownSigned)
  const base64A = Base64Utils.encode(ownHash)
  console.log(`====================================`)
  console.log(`ownSigned: ${ownSigned}`)
  console.log(`ownHash: ${ownHash}`)
  console.log(`ownHash2: ${ownHash2}`)
  console.log(`base64A: ${base64A}`)

  const encoder = new TextEncoder()
  const hmac2 = hmac(encoder.encode(key), encoder.encode(value))
  console.log(`====================================`)
  console.log(`hmac2: ${hmac2}`)
  const hmac2b64 = base64ArrayBuffer(hmac2)
  console.log(`hmac2b64: ${hmac2b64}`)

  console.log(`====================================`)
  console.log(crypto === hmac2b64)
}

main()
