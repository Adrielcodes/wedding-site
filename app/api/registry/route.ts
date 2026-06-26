import { NextResponse } from 'next/server'

export interface RegistryItem {
  id: string
  name: string
  image: string
  price: string
  url: string
  purchased: boolean
}

export async function GET() {
  try {
    const res = await fetch(
      'https://www.amazon.com/wedding/share/zamiandadrielregistry',
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'no-cache',
        },
        next: { revalidate: 1800 },
      }
    )

    if (!res.ok) {
      return NextResponse.json({ items: [] })
    }

    const html = await res.text()
    const items = parseRegistry(html)
    return NextResponse.json({ items })
  } catch {
    return NextResponse.json({ items: [] })
  }
}

function parseRegistry(html: string): RegistryItem[] {
  // Try __NEXT_DATA__ first (Amazon uses Next.js for their registry pages)
  const ndMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>([^<]+)<\/script>/)
  if (ndMatch) {
    try {
      const data = JSON.parse(ndMatch[1])
      const items = walkForItems(data)
      if (items.length > 0) return dedupe(items)
    } catch { /* continue */ }
  }

  // Try JSON-LD structured data
  const ldRe = /<script type="application\/ld\+json"[^>]*>([^<]+)<\/script>/g
  let ldM: RegExpExecArray | null
  while ((ldM = ldRe.exec(html)) !== null) {
    try {
      const data = JSON.parse(ldM[1])
      const items = walkForItems(data)
      if (items.length > 0) return dedupe(items)
    } catch { /* continue */ }
  }

  // Try inline window.__DATA__ or window.__STATE__ assignments (single-line value only)
  const stateMatch = html.match(/window\.__(?:INITIAL_)?(?:STATE|DATA)__\s*=\s*(\{[^\n]{20,}?\});/)
  if (stateMatch) {
    try {
      const data = JSON.parse(stateMatch[1])
      const items = walkForItems(data)
      if (items.length > 0) return dedupe(items)
    } catch { /* continue */ }
  }

  return []
}

function walkForItems(obj: unknown, depth = 0): RegistryItem[] {
  if (depth > 10 || !obj || typeof obj !== 'object') return []
  const o = obj as Record<string, unknown>
  const results: RegistryItem[] = []

  // Check if this object looks like a registry item
  const hasId = Boolean(o.asin || o.itemId || o.ASIN)
  const hasName = Boolean(o.title || o.name || o.productTitle || o.itemName)
  if (hasId && hasName) {
    const asin = String(o.asin || o.ASIN || o.itemId || '')
    const name = String(o.title || o.name || o.productTitle || o.itemName || '')
    if (name.length > 3) {
      results.push({
        id: asin || name.slice(0, 20),
        name,
        image: String(o.largeImage || o.imageURL || o.image || o.imgUrl || o.mediumImage || ''),
        price: formatPrice(o.currentPrice || o.price || o.formattedPrice || o.listPrice),
        url: asin
          ? `https://www.amazon.com/dp/${asin}`
          : 'https://www.amazon.com/wedding/share/zamiandadrielregistry',
        purchased: Boolean(o.purchased || o.fullyPurchased || o.isPurchased),
      })
    }
  }

  for (const key of Object.keys(o)) {
    const val = o[key]
    if (Array.isArray(val)) {
      for (const child of val) results.push(...walkForItems(child, depth + 1))
    } else if (val && typeof val === 'object') {
      results.push(...walkForItems(val, depth + 1))
    }
  }

  return results
}

function formatPrice(raw: unknown): string {
  if (!raw) return ''
  const s = String(raw)
  if (s.startsWith('$')) return s
  const n = parseFloat(s)
  if (!isNaN(n)) return `$${n.toFixed(2)}`
  return s
}

function dedupe(items: RegistryItem[]): RegistryItem[] {
  const seen = new Set<string>()
  return items.filter(i => {
    if (seen.has(i.id)) return false
    seen.add(i.id)
    return true
  })
}
