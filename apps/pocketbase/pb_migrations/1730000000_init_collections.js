/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const resources = new Collection({
      type: 'base',
      name: 'resources',
      listRule: 'status = "published"',
      viewRule: 'status = "published"',
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        {
          type: 'text',
          name: 'title',
          required: true,
          min: 1,
          max: 200,
        },
        {
          type: 'text',
          name: 'summary',
          required: true,
          min: 1,
          max: 1000,
        },
        {
          type: 'editor',
          name: 'body',
          required: false,
        },
        {
          type: 'select',
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
        },
        {
          type: 'select',
          name: 'settings',
          required: true,
          maxSelect: 3,
          values: ['church', 'home', 'community'],
        },
        {
          type: 'select',
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
        },
        {
          type: 'select',
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
        },
        {
          type: 'file',
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
        },
        {
          type: 'url',
          name: 'externalUrl',
          required: false,
        },
        {
          type: 'text',
          name: 'contributorCredit',
          required: false,
          max: 200,
        },
        {
          type: 'select',
          name: 'status',
          required: true,
          maxSelect: 1,
          values: ['draft', 'published'],
        },
      ],
      indexes: [
        'CREATE INDEX idx_resources_status ON resources (status)',
      ],
    })

    app.save(resources)

    const faqs = new Collection({
      type: 'base',
      name: 'faqs',
      listRule: '',
      viewRule: '',
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        {
          type: 'text',
          name: 'question',
          required: true,
          max: 300,
        },
        {
          type: 'editor',
          name: 'answer',
          required: true,
        },
        {
          type: 'number',
          name: 'sortOrder',
          required: false,
        },
      ],
    })

    app.save(faqs)

    const pages = new Collection({
      type: 'base',
      name: 'pages',
      listRule: '',
      viewRule: '',
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        {
          type: 'text',
          name: 'slug',
          required: true,
          min: 1,
          max: 100,
        },
        {
          type: 'text',
          name: 'title',
          required: true,
          max: 200,
        },
        {
          type: 'editor',
          name: 'body',
          required: false,
        },
      ],
      indexes: [
        'CREATE UNIQUE INDEX idx_pages_slug ON pages (slug)',
      ],
    })

    app.save(pages)

    const settings = app.settings()
    settings.meta.appName = 'Church Disability Specialist Resources'
    settings.meta.appURL = 'http://127.0.0.1:8090'
    app.save(settings)
  },
  (app) => {
    try {
      app.delete(app.findCollectionByNameOrId('resources'))
    } catch {
      /* already removed */
    }
    try {
      app.delete(app.findCollectionByNameOrId('faqs'))
    } catch {
      /* already removed */
    }
    try {
      app.delete(app.findCollectionByNameOrId('pages'))
    } catch {
      /* already removed */
    }
  },
)
