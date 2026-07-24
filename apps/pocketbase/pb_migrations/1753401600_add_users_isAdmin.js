/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    // PocketBase ships with a default "users" auth collection — extend it.
    const users = app.findCollectionByNameOrId('users')

    if (!users.fields.getByName('isAdmin')) {
      users.fields.add(
        new BoolField({
          name: 'isAdmin',
          required: false,
        }),
      )
    }

    users.listRule = 'id = @request.auth.id || @request.auth.isAdmin = true'
    users.viewRule = 'id = @request.auth.id || @request.auth.isAdmin = true'
    // Only PocketBase superusers create accounts for now (via Admin UI / API).
    users.createRule = null
    // Users may update their own profile, but cannot change isAdmin.
    users.updateRule =
      'id = @request.auth.id && (@request.body.isAdmin:isset = false)'
    users.deleteRule = null
    // Admins can fully manage other user records (including isAdmin).
    users.manageRule = '@request.auth.isAdmin = true'

    users.addIndex('idx_users_isAdmin', false, 'isAdmin', '')

    app.save(users)

    const resources = app.findCollectionByNameOrId('resources')
    resources.listRule =
      'status = "published" || @request.auth.isAdmin = true'
    resources.viewRule =
      'status = "published" || @request.auth.isAdmin = true'
    resources.createRule = '@request.auth.isAdmin = true'
    resources.updateRule = '@request.auth.isAdmin = true'
    resources.deleteRule = '@request.auth.isAdmin = true'
    app.save(resources)
  },
  (app) => {
    try {
      const resources = app.findCollectionByNameOrId('resources')
      resources.listRule = 'status = "published"'
      resources.viewRule = 'status = "published"'
      resources.createRule = null
      resources.updateRule = null
      resources.deleteRule = null
      app.save(resources)
    } catch {
      /* resources already removed */
    }

    try {
      const users = app.findCollectionByNameOrId('users')
      const isAdminField = users.fields.getByName('isAdmin')
      if (isAdminField) {
        users.fields.removeById(isAdminField.id)
      }
      users.listRule = 'id = @request.auth.id'
      users.viewRule = 'id = @request.auth.id'
      users.createRule = ''
      users.updateRule = 'id = @request.auth.id'
      users.deleteRule = 'id = @request.auth.id'
      users.manageRule = null
      try {
        users.removeIndex('idx_users_isAdmin')
      } catch {
        /* ignore */
      }
      app.save(users)
    } catch {
      /* users missing */
    }
  },
)
