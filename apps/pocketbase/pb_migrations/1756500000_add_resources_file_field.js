/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const resources = app.findCollectionByNameOrId('resources')

    if (!resources.fields.getByName('file')) {
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
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/zip',
            'application/x-zip-compressed',
            'image/jpeg',
            'image/png',
            'image/webp',
          ],
        }),
      )
      app.save(resources)
    }
  },
  (app) => {
    try {
      const resources = app.findCollectionByNameOrId('resources')
      const fileField = resources.fields.getByName('file')
      if (fileField) {
        resources.fields.removeById(fileField.id)
        app.save(resources)
      }
    } catch {
      /* resources missing */
    }
  },
)
