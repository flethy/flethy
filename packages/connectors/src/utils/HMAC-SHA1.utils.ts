export function HMACSHA1Base64(key: string, value: string): string {
  return b64_hmac_sha1(key, value, undefined, undefined)
}

function b64_hmac_sha1(k: any, d: any, _p: any, _z: any) {
  // heavily optimized and compressed version of http://pajhome.org.uk/crypt/md5/sha1.js
  // _p = b64pad, _z = character size; not used here but I left them available just in case
  if (!_p) {
    _p = '='
  }
  if (!_z) {
    _z = 8
  }
  function _f(t: any, b: any, c: any, d: any) {
    if (t < 20) {
      return (b & c) | (~b & d)
    }
    if (t < 40) {
      return b ^ c ^ d
    }
    if (t < 60) {
      return (b & c) | (b & d) | (c & d)
    }
    return b ^ c ^ d
  }
  function _k(t: any) {
    return t < 20
      ? 1518500249
      : t < 40
      ? 1859775393
      : t < 60
      ? -1894007588
      : -899497514
  }
  function _s(x: any, y: any) {
    var l = (x & 0xffff) + (y & 0xffff),
      m = (x >> 16) + (y >> 16) + (l >> 16)
    return (m << 16) | (l & 0xffff)
  }
  function _r(n: any, c: any) {
    return (n << c) | (n >>> (32 - c))
  }
  function _c(x: any, l: any) {
    x[l >> 5] |= 0x80 << (24 - (l % 32))
    x[(((l + 64) >> 9) << 4) + 15] = l
    var w = [80],
      a = 1732584193,
      b = -271733879,
      c = -1732584194,
      d = 271733878,
      e = -1009589776
    for (var i = 0; i < x.length; i += 16) {
      var o = a,
        p = b,
        q = c,
        r = d,
        s = e
      for (var j = 0; j < 80; j++) {
        if (j < 16) {
          w[j] = x[i + j]
        } else {
          w[j] = _r(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1)
        }
        var t = _s(_s(_r(a, 5), _f(j, b, c, d)), _s(_s(e, w[j]), _k(j)))
        e = d
        d = c
        c = _r(b, 30)
        b = a
        a = t
      }
      a = _s(a, o)
      b = _s(b, p)
      c = _s(c, q)
      d = _s(d, r)
      e = _s(e, s)
    }
    return [a, b, c, d, e]
  }
  function _b(s: any) {
    var b: any[] = [],
      m = (1 << _z) - 1
    for (var i = 0; i < s.length * _z; i += _z) {
      b[i >> 5] |= (s.charCodeAt(i / 8) & m) << (32 - _z - (i % 32))
    }
    return b
  }
  function _h(k: any, d: any) {
    var b = _b(k)
    if (b.length > 16) {
      b = _c(b, k.length * _z)
    }
    var p = [16],
      o = [16]
    for (var i = 0; i < 16; i++) {
      p[i] = b[i] ^ 0x36363636
      o[i] = b[i] ^ 0x5c5c5c5c
    }
    var h = _c(p.concat(_b(d)), 512 + d.length * _z)
    return _c(o.concat(h), 512 + 160)
  }
  function _n(b: any) {
    var t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
      s = ''
    for (var i = 0; i < b.length * 4; i += 3) {
      var r =
        (((b[i >> 2] >> (8 * (3 - (i % 4)))) & 0xff) << 16) |
        (((b[(i + 1) >> 2] >> (8 * (3 - ((i + 1) % 4)))) & 0xff) << 8) |
        ((b[(i + 2) >> 2] >> (8 * (3 - ((i + 2) % 4)))) & 0xff)
      for (var j = 0; j < 4; j++) {
        if (i * 8 + j * 6 > b.length * 32) {
          s += _p
        } else {
          s += t.charAt((r >> (6 * (3 - j))) & 0x3f)
        }
      }
    }
    return s
  }
  function _x(k: any, d: any) {
    return _n(_h(k, d))
  }
  return _x(k, d)
}
