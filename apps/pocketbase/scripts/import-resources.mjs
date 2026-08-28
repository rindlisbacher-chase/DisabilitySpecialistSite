import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import PocketBase from 'pocketbase'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const RESOURCES_DIR =
  process.env.RESOURCES_DIR ??
  'C:\\Users\\cjrja\\Downloads\\Disability Specialist Site Images\\resources'
const PB_URL = process.env.POCKETBASE_URL ?? 'http://127.0.0.1:8090'
const PB_EMAIL = process.env.POCKETBASE_EMAIL ?? 'dev@localhost.local'
const PB_PASSWORD = process.env.POCKETBASE_PASSWORD ?? 'LocalDevPass123!'

const SKIP_DIRS = new Set(['contribute_form'])
const SKIP_FILES = new Set(['links.md'])

function formatAuthor(folderName) {
  if (folderName === '(root)') return 'Community contributors'
  return folderName
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function cleanTitle(filename) {
  return path
    .basename(filename, path.extname(filename))
    .replace(/[_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function inferType(filename) {
  const ext = path.extname(filename).toLowerCase()
  const lower = filename.toLowerCase()

  if (ext === '.pptx' || lower.includes('presentation')) return 'presentation'
  if (lower.includes('training') && ext === '.pdf') return 'presentation'
  if (lower.includes('talk') || lower.includes('outline')) return 'talk'
  return 'printable'
}

function inferSummary(name, author, type) {
  const typeLabel =
    type === 'presentation'
      ? 'Presentation'
      : type === 'talk'
        ? 'Talk outline'
        : 'Printable resource'
  return `${typeLabel} shared by ${author}.`
}

function parseLinksFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8')
  const entries = []
  const seenUrls = new Set()

  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^(?:[·\s]*)?(.+?):\s*(https:\S+)\s*$/u)
    if (!match) continue

    const name = match[1].trim()
    const link = match[2].trim()
    if (!name || seenUrls.has(link)) continue

    seenUrls.add(link)
    entries.push({ name, link, author: 'Church of Jesus Christ', type: 'printable' })
  }

  return entries
}

function inferTags(name, disabilities, audiences) {
  const lower = name.toLowerCase()
  const disabilityIds = []
  const audienceIds = []

  const findDisability = (...needles) => {
    for (const needle of needles) {
      const hit = disabilities.find((d) =>
        d.name.toLowerCase().includes(needle),
      )
      if (hit) return hit.id
    }
    return null
  }

  const findAudience = (...needles) => {
    for (const needle of needles) {
      const hit = audiences.find((a) =>
        a.name.toLowerCase().includes(needle),
      )
      if (hit) return hit.id
    }
    return null
  }

  if (lower.includes('autism') || lower.includes('neuro')) {
    const id = findDisability('autism')
    if (id) disabilityIds.push(id)
  }
  if (lower.includes('mental health') || lower.includes('social anxiety')) {
    const id = findDisability('mental health')
    if (id) disabilityIds.push(id)
  }
  if (lower.includes('hearing') || lower.includes('deaf')) {
    const id = findDisability('hearing')
    if (id) disabilityIds.push(id)
  }
  if (lower.includes('vision') || lower.includes('blind')) {
    const id = findDisability('vision')
    if (id) disabilityIds.push(id)
  }

  if (
    lower.includes('leader') ||
    lower.includes('stake') ||
    lower.includes('ward council') ||
    lower.includes('bishop')
  ) {
    const id = findAudience('leaders')
    if (id) audienceIds.push(id)
  }
  if (lower.includes('youth') && !lower.includes('young adult')) {
    const id = findAudience('youth')
    if (id) audienceIds.push(id)
  }
  if (lower.includes('young adult') || lower.includes('single adult')) {
    const id = findAudience('young adult')
    if (id) audienceIds.push(id)
  }
  if (lower.includes('children') || lower.includes('primary')) {
    const id = findAudience('primary')
    if (id) audienceIds.push(id)
  }
  if (lower.includes('parent') || lower.includes('caregiver') || lower.includes('families')) {
    const id = findAudience('parents')
    if (id) audienceIds.push(id)
  }

  return { disabilityIds, audienceIds }
}

async function findExisting(pb, name, author) {
  const escapedName = name.replace(/"/g, '\\"')
  const escapedAuthor = author.replace(/"/g, '\\"')
  const result = await pb.collection('resources').getList(1, 1, {
    filter: `name = "${escapedName}" && author = "${escapedAuthor}"`,
  })
  return result.items[0] ?? null
}

async function createLinkResource(pb, entry, disabilities, audiences) {
  const existing = await findExisting(pb, entry.name, entry.author)
  if (existing) {
    console.log(`  skip (exists): ${entry.name}`)
    return existing
  }

  const { disabilityIds, audienceIds } = inferTags(
    entry.name,
    disabilities,
    audiences,
  )

  const record = await pb.collection('resources').create({
    name: entry.name,
    author: entry.author,
    type: entry.type,
    link: entry.link,
    summary: `Official Church resource: ${entry.name}.`,
    status: 'published',
    disabilities: disabilityIds,
    audiences: audienceIds,
  })

  console.log(`  + link: ${entry.name}`)
  return record
}

async function createFileResource(pb, filePath, authorFolder, disabilities, audiences) {
  const filename = path.basename(filePath)
  const author = formatAuthor(authorFolder)
  const name = cleanTitle(filename)
  const type = inferType(filename)
  const summary = inferSummary(name, author, type)

  const existing = await findExisting(pb, name, author)
  if (existing) {
    console.log(`  skip (exists): ${name}`)
    return existing
  }

  const { disabilityIds, audienceIds } = inferTags(name, disabilities, audiences)
  const fileBuffer = fs.readFileSync(filePath)
  const blob = new Blob([fileBuffer])

  const formData = new FormData()
  formData.append('name', name)
  formData.append('author', author)
  formData.append('type', type)
  formData.append('summary', summary)
  formData.append('status', 'published')
  formData.append('file', blob, filename)
  for (const id of disabilityIds) formData.append('disabilities', id)
  for (const id of audienceIds) formData.append('audiences', id)

  let record = await pb.collection('resources').create(formData)

  if (record.file) {
    const link = pb.files.getURL(record, record.file)
    record = await pb.collection('resources').update(record.id, { link })
  }

  console.log(`  + file: ${name} (${author})`)
  return record
}

function collectFiles(rootDir) {
  const files = []

  for (const entry of fs.readdirSync(rootDir, { withFileTypes: true })) {
    const fullPath = path.join(rootDir, entry.name)

    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) {
        console.log(`skip folder: ${entry.name}`)
        continue
      }
      for (const file of fs.readdirSync(fullPath)) {
        const filePath = path.join(fullPath, file)
        if (fs.statSync(filePath).isFile()) {
          files.push({ filePath, authorFolder: entry.name })
        }
      }
      continue
    }

    if (entry.isFile() && !SKIP_FILES.has(entry.name)) {
      files.push({ filePath: fullPath, authorFolder: '(root)' })
    }
  }

  return files
}

async function main() {
  if (!fs.existsSync(RESOURCES_DIR)) {
    console.error(`Resources folder not found: ${RESOURCES_DIR}`)
    process.exit(1)
  }

  const pb = new PocketBase(PB_URL)

  console.log(`Connecting to ${PB_URL}...`)
  await pb.collection('_superusers').authWithPassword(PB_EMAIL, PB_PASSWORD)

  const disabilities = (
    await pb.collection('disabilities').getFullList({ sort: 'sortOrder,name' })
  ).map((r) => ({ id: r.id, name: r.name }))

  const audiences = (
    await pb.collection('audiences').getFullList({ sort: 'sortOrder,name' })
  ).map((r) => ({ id: r.id, name: r.name }))

  console.log(`\nImporting files from:\n  ${RESOURCES_DIR}\n`)

  const files = collectFiles(RESOURCES_DIR)
  console.log(`Found ${files.length} files to import\n`)

  for (const { filePath, authorFolder } of files) {
    await createFileResource(pb, filePath, authorFolder, disabilities, audiences)
  }

  const linksPath = path.join(RESOURCES_DIR, 'links.md')
  if (fs.existsSync(linksPath)) {
    const links = parseLinksFile(linksPath)
    console.log(`\nImporting ${links.length} unique links from links.md\n`)
    for (const entry of links) {
      await createLinkResource(pb, entry, disabilities, audiences)
    }
  }

  const total = await pb.collection('resources').getList(1, 1, {
    filter: 'status = "published"',
  })

  console.log(`\nDone. ${total.totalItems} published resources in PocketBase.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
