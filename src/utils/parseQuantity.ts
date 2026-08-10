const SUP_DIGITS = '⁰¹²³⁴⁵⁶⁷⁸⁹'

function desuper(s: string): string {
  return [...s].map(c => {
    const i = SUP_DIGITS.indexOf(c)
    return i >= 0 ? String(i) : c
  }).join('')
}

/**
 * Parse a quantity string to BigInt.
 * Handles: plain ints/floats, comma-separated numbers, word suffixes (billion/trillion/...),
 * short suffixes (k/m/b/t/q), scientific notation (1e22), and unicode superscript powers (10²², 2 × 10¹⁸).
 */
export function parseQuantity(raw: string | null | undefined): bigint | null {
  if (!raw) return null
  const s = raw.trim().replace(/,/g, '')
  if (!s) return null

  // "2 × 10¹⁸" — unicode multiplication with superscript exponent
  const mulPow = s.match(/^(\d+)\s*[×x]\s*10([⁰¹²³⁴⁵⁶⁷⁸⁹]+)$/)
  if (mulPow) return BigInt(mulPow[1]) * 10n ** BigInt(desuper(mulPow[2]))

  // "10²²" — bare superscript power
  const pow = s.match(/^10([⁰¹²³⁴⁵⁶⁷⁸⁹]+)$/)
  if (pow) return 10n ** BigInt(desuper(pow[1]))

  const sl = s.toLowerCase()

  // "1.5e22" — standard scientific notation
  const sci = sl.match(/^([\d.]+)e\+?(\d+)$/)
  if (sci) {
    const exp = BigInt(sci[2])
    const [intPart, fracPart = ''] = sci[1].split('.')
    const digits = intPart + fracPart
    const shift = exp - BigInt(fracPart.length)
    if (shift >= 0n) return BigInt(digits) * 10n ** shift
    return BigInt(digits) / 10n ** (-shift)
  }

  // Word and short suffixes (multi-char before single-char, largest first)
  const suffixes: [RegExp, bigint][] = [
    [/^([\d.]+)\s+decillion$/,   10n ** 33n],
    [/^([\d.]+)\s+nonillion$/,   10n ** 30n],
    [/^([\d.]+)\s+octillion$/,   10n ** 27n],
    [/^([\d.]+)\s+septillion$/,  10n ** 24n],
    [/^([\d.]+)\s+sextillion$/,  10n ** 21n],
    [/^([\d.]+)\s+quintillion$/, 10n ** 18n],
    [/^([\d.]+)\s+quadrillion$/, 10n ** 15n],
    [/^([\d.]+)\s+trillion$/,    1_000_000_000_000n],
    [/^([\d.]+)\s+billion$/,     1_000_000_000n],
    [/^([\d.]+)\s+million$/,     1_000_000n],
    [/^([\d.]+)\s+thousand$/,    1_000n],
    [/^([\d.]+)sp$/,  10n ** 24n],  // septillion
    [/^([\d.]+)sx$/,  10n ** 21n],  // sextillion
    [/^([\d.]+)qi$/,  10n ** 18n],  // quintillion
    [/^([\d.]+)qu$/,  10n ** 18n],  // quintillion (alternate notation)
    [/^([\d.]+)qa$/,  10n ** 15n],  // quadrillion (alias for q)
    [/^([\d.]+)q$/,   10n ** 15n],  // quadrillion
    [/^([\d.]+)t$/,   1_000_000_000_000n],
    [/^([\d.]+)b$/,   1_000_000_000n],
    [/^([\d.]+)m$/,   1_000_000n],
    [/^([\d.]+)k$/,   1_000n],
    [/^([\d.]+)d$/,   10n ** 33n],  // decillion (single char, after multi-char)
    [/^([\d.]+)n$/,   10n ** 30n],  // nonillion
    [/^([\d.]+)o$/,   10n ** 27n],  // octillion
  ]
  for (const [re, mult] of suffixes) {
    const m = sl.match(re)
    if (m) {
      const [intPart, fracPart = ''] = m[1].split('.')
      const digits = intPart + fracPart
      return BigInt(digits) * mult / 10n ** BigInt(fracPart.length)
    }
  }

  // Plain integer
  if (/^\d+$/.test(s)) return BigInt(s)

  // Plain float — round to nearest integer
  const n = parseFloat(s)
  if (!isNaN(n) && isFinite(n)) return BigInt(Math.round(n))

  return null
}

const FORMAT_TIERS: [bigint, string][] = [
  [10n ** 33n, 'd'],
  [10n ** 30n, 'n'],
  [10n ** 27n, 'o'],
  [10n ** 24n, 'sp'],
  [10n ** 21n, 'sx'],
  [10n ** 18n, 'qi'],
  [10n ** 15n, 'qa'],
  [10n ** 12n, 't'],
  [10n **  9n, 'b'],
  [10n **  6n, 'm'],
  [10n **  3n, 'k'],
]

/** Convert a BigInt quantity to a compact human-readable string (e.g. 10sq, 2qi, 1.5m). */
export function formatQuantity(n: bigint): string {
  for (const [mult, suffix] of FORMAT_TIERS) {
    if (n >= mult) {
      const coeff = n / mult
      // Skip this tier if the coefficient would be unreadably large
      if (coeff > 9999n) continue
      if (n % mult === 0n) return `${coeff}${suffix}`
      const tenth = mult / 10n
      if (tenth > 0n && n % tenth === 0n) {
        return `${coeff}.${(n % mult) / tenth}${suffix}`
      }
      const hundredth = mult / 100n
      if (hundredth > 0n && n % hundredth === 0n) {
        const dec = String((n % mult) / hundredth).padStart(2, '0')
        return `${coeff}.${dec}${suffix}`
      }
    }
  }
  // Fall back to compact e notation
  const s = n.toString()
  const sig = s.replace(/0+$/, '')
  const exp = s.length - 1
  if (sig.length <= 1) return `${sig}e${exp}`
  const dec = sig.slice(1).replace(/0+$/, '')
  return dec ? `${sig[0]}.${dec}e${exp}` : `${sig[0]}e${exp}`
}

export function meetsRequirement(
  playerAmountStr: string | undefined,
  requiredDisplay: string | null
): 'met' | 'unmet' | 'unknown' {
  if (!playerAmountStr?.trim()) return 'unknown'
  const player = parseQuantity(playerAmountStr)
  if (player === null) return 'unknown'

  if (requiredDisplay === null) {
    // "any" requirement
    return player > 0n ? 'met' : 'unmet'
  }

  const required = parseQuantity(requiredDisplay)
  if (required === null) return 'unknown'
  return player >= required ? 'met' : 'unmet'
}
