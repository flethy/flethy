// To ensure cross-browser support even without a proper SubtleCrypto
// impelmentation (or without access to the impelmentation, as is the case with
// Chrome loaded over HTTP instead of HTTPS), this library can create SHA-256
// HMAC signatures using nothing but raw JavaScript

import { Base64Utils } from './Base64.utils'

/* eslint-disable no-magic-numbers, id-length, no-param-reassign, new-cap */

// By giving internal functions names that we can mangle, future calls to
// them are reduced to a single byte (minor space savings in minified file)

// see https://gist.github.com/stevendesu/2d52f7b5e1f1184af3b667c0b5e054b8

export class HMACUtils {
  private uint8Array = Uint8Array
  private uint32Array = Uint32Array
  private pow = Math.pow

  // Will be initialized below
  // Using a Uint32Array instead of a simple array makes the minified code
  // a bit bigger (we lose our `unshift()` hack), but comes with huge
  // performance gains
  private DEFAULT_STATE = new Uint32Array(8)
  private ROUND_CONSTANTS: number[] = []

  // Reusable object for expanded message
  // Using a Uint32Array instead of a simple array makes the minified code
  // 7 bytes larger, but comes with huge performance gains
  private M = new Uint32Array(64)
  private LittleEndian = !!new Uint8Array(new Uint32Array([1]).buffer)[0]

  private encoder = new TextEncoder()

  constructor() {
    let n = 2
    let nPrime = 0
    while (nPrime < 64) {
      // isPrime() was in-lined from its original function form to save
      // a few bytes
      var isPrime = true
      // Math.sqrt() was replaced with pow(n, 1/2) to save a few bytes
      // var sqrtN = pow(n, 1 / 2);
      // So technically to determine if a number is prime you only need to
      // check numbers up to the square root. However this function only runs
      // once and we're only computing the first 64 primes (up to 311), so on
      // any modern CPU this whole function runs in a couple milliseconds.
      // By going to n / 2 instead of sqrt(n) we net 8 byte savings and no
      // scaling performance cost
      for (var factor = 2; factor <= n / 2; factor++) {
        if (n % factor === 0) {
          isPrime = false
        }
      }
      if (isPrime) {
        if (nPrime < 8) {
          this.DEFAULT_STATE[nPrime] = HMACUtils.getFractionalBits(
            Math.pow(n, 1 / 2),
          )
        }
        this.ROUND_CONSTANTS[nPrime] = HMACUtils.getFractionalBits(
          Math.pow(n, 1 / 3),
        )

        nPrime++
      }

      n++
    }
  }

  // After minification the code to compute the default state and round
  // constants is smaller than the output. More importantly, this serves as a
  // good educational aide for anyone wondering where the magic numbers come
  // from. No magic numbers FTW!
  private static getFractionalBits(n: number) {
    return ((n - (n | 0)) * Math.pow(2, 32)) | 0
  }

  private convertEndian(word: any) {
    if (this.LittleEndian) {
      return (
        // byte 1 -> byte 4
        (word >>> 24) |
        // byte 2 -> byte 3
        (((word >>> 16) & 0xff) << 8) |
        // byte 3 -> byte 2
        ((word & 0xff00) << 8) |
        // byte 4 -> byte 1
        (word << 24)
      )
    } else {
      return word
    }
  }

  private rightRotate(word: any, bits: any) {
    return (word >>> bits) | (word << (32 - bits))
  }

  private sha256(data: any) {
    // Copy default state
    let STATE = this.DEFAULT_STATE.slice()

    // Caching this reduces occurrences of ".length" in minified JavaScript
    // 3 more byte savings! :D
    let legth = data.length

    // Pad data
    let bitLength = legth * 8
    let newBitLength = 512 - ((bitLength + 64) % 512) - 1 + bitLength + 65

    // "bytes" and "words" are stored BigEndian
    let bytes = new Uint8Array(newBitLength / 8)
    let words = new Uint32Array(bytes.buffer)

    bytes.set(data, 0)
    // Append a 1
    bytes[legth] = 0b10000000
    // Store length in BigEndian
    words[words.length - 1] = this.convertEndian(bitLength)

    // Loop iterator (avoid two instances of "var") -- saves 2 bytes
    let round

    // Process blocks (512 bits / 64 bytes / 16 words at a time)
    for (let block = 0; block < newBitLength / 32; block += 16) {
      let workingState = STATE.slice()

      // Rounds
      for (round = 0; round < 64; round++) {
        let MRound
        // Expand message
        if (round < 16) {
          // Convert to platform Endianness for later math
          MRound = this.convertEndian(words[block + round])
        } else {
          let gamma0x = this.M[round - 15]
          let gamma1x = this.M[round - 2]
          MRound =
            this.M[round - 7] +
            this.M[round - 16] +
            (this.rightRotate(gamma0x, 7) ^
              this.rightRotate(gamma0x, 18) ^
              (gamma0x >>> 3)) +
            (this.rightRotate(gamma1x, 17) ^
              this.rightRotate(gamma1x, 19) ^
              (gamma1x >>> 10))
        }

        // M array matches platform endianness
        this.M[round] = MRound |= 0

        // Computation
        let t1 =
          (this.rightRotate(workingState[4], 6) ^
            this.rightRotate(workingState[4], 11) ^
            this.rightRotate(workingState[4], 25)) +
          ((workingState[4] & workingState[5]) ^
            (~workingState[4] & workingState[6])) +
          workingState[7] +
          MRound +
          this.ROUND_CONSTANTS[round]
        let t2 =
          (this.rightRotate(workingState[0], 2) ^
            this.rightRotate(workingState[0], 13) ^
            this.rightRotate(workingState[0], 22)) +
          ((workingState[0] & workingState[1]) ^
            (workingState[2] & (workingState[0] ^ workingState[1])))
        for (let i = 7; i > 0; i--) {
          workingState[i] = workingState[i - 1]
        }
        workingState[0] = (t1 + t2) | 0
        workingState[4] = (workingState[4] + t1) | 0
      }

      // Update state
      for (round = 0; round < 8; round++) {
        STATE[round] = (STATE[round] + workingState[round]) | 0
      }
    }

    // Finally the state needs to be converted to BigEndian for output
    // And we want to return a Uint8Array, not a Uint32Array
    return new Uint8Array(
      new Uint32Array(
        STATE.map((val) => {
          return this.convertEndian(val)
        }),
      ).buffer,
    )
  }

  private hmac(key: any, data: any) {
    if (key.length > 64) {
      key = this.sha256(key)
    }

    if (key.length < 64) {
      const tmp = new Uint8Array(64)
      tmp.set(key, 0)
      key = tmp
    }

    // Generate inner and outer keys
    let innerKey = new Uint8Array(64)
    let outerKey = new Uint8Array(64)
    for (let i = 0; i < 64; i++) {
      innerKey[i] = 0x36 ^ key[i]
      outerKey[i] = 0x5c ^ key[i]
    }

    // Append the innerKey
    var msg = new Uint8Array(data.length + 64)
    msg.set(innerKey, 0)
    msg.set(data, 64)

    // Has the previous message and append the outerKey
    var result = new Uint8Array(64 + 32)
    result.set(outerKey, 0)
    result.set(this.sha256(msg), 64)

    // Hash the previous message
    return this.sha256(result)
  }

  public sign(inputKey: any, inputData: any) {
    const key =
      typeof inputKey === 'string' ? this.encoder.encode(inputKey) : inputKey
    const data =
      typeof inputData === 'string' ? this.encoder.encode(inputData) : inputData
    return this.hmac(key, data)
  }

  public hash(str: any) {
    return this.hex(this.sha256(this.encoder.encode(str)))
  }

  public hash2(str: any) {
    return Base64Utils.encode(this.sha256(this.encoder.encode(str)))
  }

  public hex(bin: any) {
    return bin.reduce(
      (acc: any, val: any) => acc + ('00' + val.toString(16)).substring(-2),
      '',
    )
  }
}
