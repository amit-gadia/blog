'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('blog', (table) => {
      table.increments()
      table.string('title', 100)
      table.string('content', 5000)
      table.string('flag', 32)
    })
  }

  down () {
  }
}

module.exports = UserSchema
