'use strict'

const Schema = use('Schema')

class GamesSchema extends Schema {
  up () {
    this.create('games', table => {
      table.increments()
      table.integer('player_id').unsigned().notNullable()
        .references('id').inTable('users')

      table.integer('opponent_id').unsigned().notNullable()
        .references('id').inTable('users')

      table.integer('player_score').unsigned().defaultTo(0)
      table.integer('opponent_score').unsigned().defaultTo(0)
      table.string('result', 1) // @values Win: 'w', Lose: 'l', Draw: 'd'
      table.timestamps()
    })
  }

  down () {
    this.drop('games')
  }
}

module.exports = GamesSchema
