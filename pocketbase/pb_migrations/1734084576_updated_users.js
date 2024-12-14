/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "select4040684810",
    "maxSelect": 1,
    "name": "accessLevel",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "user",
      "admin"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // remove field
  collection.fields.removeById("select4040684810")

  return app.save(collection)
})
