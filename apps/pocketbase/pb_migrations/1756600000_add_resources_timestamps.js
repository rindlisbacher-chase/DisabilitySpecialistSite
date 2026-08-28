/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const resources = app.findCollectionByNameOrId('resources')

    if (!resources.fields.getByName('created')) {
      resources.fields.add(
        new AutodateField({
          name: 'created',
          onCreate: true,
          onUpdate: false,
        }),
      )
    }

    if (!resources.fields.getByName('updated')) {
      resources.fields.add(
        new AutodateField({
          name: 'updated',
          onCreate: true,
          onUpdate: true,
        }),
      )
    }

    app.save(resources)

    const now = new DateTime()
    const existingResources = app.findRecordsByFilter('resources', '', '', 0, 0)

    for (const record of existingResources) {
      record.setRaw('created', now)
      record.setRaw('updated', now)
      app.save(record)
    }
  },
  (app) => {
    try {
      const resources = app.findCollectionByNameOrId('resources')

      const createdField = resources.fields.getByName('created')
      if (createdField) {
        resources.fields.removeById(createdField.id)
      }

      const updatedField = resources.fields.getByName('updated')
      if (updatedField) {
        resources.fields.removeById(updatedField.id)
      }

      app.save(resources)
    } catch {
      /* resources missing */
    }
  },
)
