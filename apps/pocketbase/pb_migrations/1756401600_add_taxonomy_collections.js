/// <reference path="../pb_data/types.d.ts" />

const DISABILITIES = [
  {
    name: 'Autism',
    description:
      'May affect language, behavior, social skills, and communication. Support often includes predictability, sensory awareness, and caregiver partnership.',
    sortOrder: 1,
  },
  {
    name: 'Chronic illness / medical disabilities',
    description:
      'May affect health, energy, and quality of life. Flexibility, ministering, and caregiver support matter.',
    sortOrder: 2,
  },
  {
    name: 'Hearing loss & deafness',
    description:
      'Affects hearing and verbal communication. Consider seating, microphones, interpreters, and other access tools.',
    sortOrder: 3,
  },
  {
    name: 'Intellectual disability',
    description:
      'May affect learning, thinking, problem solving, and self-care. Focus on belonging, clear communication, and meaningful participation.',
    sortOrder: 4,
  },
  {
    name: 'Learning disability',
    description:
      'Affects learning by traditional methods alone (for example ADHD or dyslexia). Offer multiple ways to receive and share information.',
    sortOrder: 5,
  },
  {
    name: 'Memory loss',
    description:
      'Affects short- and/or long-term memory. Patience, familiar routines, and caregiver support help.',
    sortOrder: 6,
  },
  {
    name: 'Mental health / mental illness',
    description:
      'Can affect thoughts, emotions, and behavior. Respond with compassion, confidentiality, and appropriate referrals.',
    sortOrder: 7,
  },
  {
    name: 'Physical disability',
    description:
      'May affect mobility and self-care. Check building access, seating, and how callings and activities can include everyone.',
    sortOrder: 8,
  },
  {
    name: 'Speech & language disorder',
    description:
      'Affects communication. Allow time, alternative formats, and respectful listening.',
    sortOrder: 9,
  },
  {
    name: 'Vision loss & blindness',
    description:
      'Affects sight and visual communication. Offer large print, high contrast, verbal cues, and accessible digital formats.',
    sortOrder: 10,
  },
]

const AUDIENCES = [
  { name: 'Primary', description: '3–11', sortOrder: 1 },
  { name: 'Youth', description: '11–17', sortOrder: 2 },
  { name: 'Young Adult', description: '18–35', sortOrder: 3 },
  {
    name: 'Young Single Adults',
    description: '18–35, unmarried',
    sortOrder: 4,
  },
  { name: 'Parents', description: '', sortOrder: 5 },
  { name: 'Leaders', description: '', sortOrder: 6 },
]

const TYPE_MAP = {
  'how-to': 'printable',
  idea: 'printable',
  presentation: 'presentation',
  printable: 'printable',
  'external-link': 'video',
  video: 'video',
}

function removeFieldIfExists(collection, fieldName) {
  const field = collection.fields.getByName(fieldName)
  if (field) {
    collection.fields.removeById(field.id)
  }
}

migrate(
  (app) => {
    const disabilities = new Collection({
      type: 'base',
      name: 'disabilities',
      listRule: '',
      viewRule: '',
      createRule: '@request.auth.isAdmin = true',
      updateRule: '@request.auth.isAdmin = true',
      deleteRule: '@request.auth.isAdmin = true',
      fields: [
        {
          type: 'text',
          name: 'name',
          required: true,
          min: 1,
          max: 200,
        },
        {
          type: 'text',
          name: 'description',
          required: true,
          min: 1,
          max: 2000,
        },
        {
          type: 'number',
          name: 'sortOrder',
          required: false,
          min: 0,
        },
      ],
      indexes: [
        'CREATE INDEX idx_disabilities_sortOrder ON disabilities (sortOrder)',
      ],
    })

    app.save(disabilities)

    const audiences = new Collection({
      type: 'base',
      name: 'audiences',
      listRule: '',
      viewRule: '',
      createRule: '@request.auth.isAdmin = true',
      updateRule: '@request.auth.isAdmin = true',
      deleteRule: '@request.auth.isAdmin = true',
      fields: [
        {
          type: 'text',
          name: 'name',
          required: true,
          min: 1,
          max: 200,
        },
        {
          type: 'text',
          name: 'description',
          required: false,
          max: 500,
        },
        {
          type: 'number',
          name: 'sortOrder',
          required: false,
          min: 0,
        },
      ],
      indexes: [
        'CREATE INDEX idx_audiences_sortOrder ON audiences (sortOrder)',
      ],
    })

    app.save(audiences)

    for (const item of DISABILITIES) {
      const record = new Record(disabilities)
      record.set('name', item.name)
      record.set('description', item.description)
      record.set('sortOrder', item.sortOrder)
      app.save(record)
    }

    for (const item of AUDIENCES) {
      const record = new Record(audiences)
      record.set('name', item.name)
      if (item.description) {
        record.set('description', item.description)
      }
      record.set('sortOrder', item.sortOrder)
      app.save(record)
    }

    const resources = app.findCollectionByNameOrId('resources')

    resources.fields.add(
      new TextField({
        name: 'name',
        required: false,
        min: 1,
        max: 200,
      }),
    )
    resources.fields.add(
      new TextField({
        name: 'author',
        required: false,
        max: 200,
      }),
    )
    resources.fields.add(
      new URLField({
        name: 'link',
        required: false,
      }),
    )

    app.save(resources)

    const existingResources = app.findRecordsByFilter('resources', '', '', 0, 0)
    const typeBackups = []

    for (const record of existingResources) {
      const oldType = record.get('type')
      typeBackups.push({
        id: record.id,
        mappedType: TYPE_MAP[oldType] || 'printable',
      })

      const title = record.get('title')
      if (title && !record.get('name')) {
        record.set('name', title)
      }

      const credit = record.get('contributorCredit')
      if (credit && !record.get('author')) {
        record.set('author', credit)
      }

      const externalUrl = record.get('externalUrl')
      if (externalUrl && !record.get('link')) {
        record.set('link', externalUrl)
      }

      app.save(record)
    }

    removeFieldIfExists(resources, 'type')
    resources.fields.add(
      new SelectField({
        name: 'type',
        required: true,
        maxSelect: 1,
        values: ['printable', 'presentation', 'talk', 'video'],
      }),
    )
    app.save(resources)

    for (const backup of typeBackups) {
      const record = app.findRecordById('resources', backup.id)
      record.set('type', backup.mappedType)
      app.save(record)
    }

    removeFieldIfExists(resources, 'title')
    removeFieldIfExists(resources, 'body')
    removeFieldIfExists(resources, 'settings')
    removeFieldIfExists(resources, 'topics')
    removeFieldIfExists(resources, 'audiences')
    removeFieldIfExists(resources, 'file')
    removeFieldIfExists(resources, 'externalUrl')
    removeFieldIfExists(resources, 'contributorCredit')

    resources.fields.add(
      new RelationField({
        name: 'disabilities',
        required: false,
        collectionId: disabilities.id,
        maxSelect: 20,
        minSelect: 0,
        cascadeDelete: false,
      }),
    )
    resources.fields.add(
      new RelationField({
        name: 'audiences',
        required: false,
        collectionId: audiences.id,
        maxSelect: 20,
        minSelect: 0,
        cascadeDelete: false,
      }),
    )

    resources.fields.getByName('name').required = true
    resources.fields.getByName('summary').required = true

    app.save(resources)
  },
  (app) => {
    try {
      const resources = app.findCollectionByNameOrId('resources')

      removeFieldIfExists(resources, 'disabilities')
      removeFieldIfExists(resources, 'audiences')
      removeFieldIfExists(resources, 'link')
      removeFieldIfExists(resources, 'author')
      removeFieldIfExists(resources, 'name')

      removeFieldIfExists(resources, 'type')
      resources.fields.add(
        new SelectField({
          name: 'type',
          required: true,
          maxSelect: 1,
          values: [
            'how-to',
            'idea',
            'presentation',
            'printable',
            'external-link',
            'video',
          ],
        }),
      )

      resources.fields.add(
        new TextField({
          name: 'title',
          required: true,
          min: 1,
          max: 200,
        }),
      )
      resources.fields.add(
        new TextField({
          name: 'summary',
          required: true,
          min: 1,
          max: 1000,
        }),
      )
      resources.fields.add(
        new EditorField({
          name: 'body',
          required: false,
        }),
      )
      resources.fields.add(
        new SelectField({
          name: 'settings',
          required: true,
          maxSelect: 3,
          values: ['church', 'home', 'community'],
        }),
      )
      resources.fields.add(
        new SelectField({
          name: 'topics',
          required: true,
          maxSelect: 11,
          values: [
            'autism',
            'chronic-illness',
            'hearing',
            'intellectual',
            'learning',
            'memory',
            'mental-health',
            'physical',
            'speech-language',
            'vision',
            'general',
          ],
        }),
      )
      resources.fields.add(
        new SelectField({
          name: 'audiences',
          required: true,
          maxSelect: 5,
          values: [
            'ward-specialist',
            'stake-specialist',
            'leaders',
            'families',
            'caregivers',
          ],
        }),
      )
      resources.fields.add(
        new FileField({
          name: 'file',
          required: false,
          maxSelect: 1,
          maxSize: 52428800,
          mimeTypes: [
            'application/pdf',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/jpeg',
            'image/png',
            'image/webp',
          ],
        }),
      )
      resources.fields.add(
        new URLField({
          name: 'externalUrl',
          required: false,
        }),
      )
      resources.fields.add(
        new TextField({
          name: 'contributorCredit',
          required: false,
          max: 200,
        }),
      )

      app.save(resources)
    } catch {
      /* resources missing */
    }

    try {
      app.delete(app.findCollectionByNameOrId('disabilities'))
    } catch {
      /* already removed */
    }

    try {
      app.delete(app.findCollectionByNameOrId('audiences'))
    } catch {
      /* already removed */
    }
  },
)
