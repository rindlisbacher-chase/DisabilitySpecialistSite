export function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      const id = parsed.pathname.slice(1)
      return id ? `https://www.youtube.com/embed/${id}` : null
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const id = parsed.searchParams.get('v')
      if (id) return `https://www.youtube.com/embed/${id}`

      const shortsMatch = parsed.pathname.match(/^\/shorts\/([^/]+)/)
      if (shortsMatch?.[1]) {
        return `https://www.youtube.com/embed/${shortsMatch[1]}`
      }

      const embedMatch = parsed.pathname.match(/^\/embed\/([^/]+)/)
      if (embedMatch?.[1]) {
        return `https://www.youtube.com/embed/${embedMatch[1]}`
      }
    }
  } catch {
    return null
  }

  return null
}

export function isPdfUrl(url: string): boolean {
  try {
    const pathname = new URL(url).pathname.toLowerCase()
    return pathname.endsWith('.pdf')
  } catch {
    return url.toLowerCase().includes('.pdf')
  }
}

export function formatResourceDate(iso: string | undefined): string {
  if (!iso) return ''
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString()
}

export function resourceActionLabel(type: string): string {
  switch (type) {
    case 'video':
      return 'Watch resource'
    case 'presentation':
      return 'Download presentation'
    case 'talk':
      return 'Download talk outline'
    default:
      return 'Download resource'
  }
}
