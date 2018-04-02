'use strict'

const Schema = use('Schema')

class MatchsSchema extends Schema {
  up () {
    this.create('matches', table => {
      table.increments()
      table.integer('player_id').unsigned().notNullable()
        .references('id').inTable('users')

      table.integer('opponent_id').unsigned().notNullable()
        .references('id').inTable('users')

      table.integer('player_score').unsigned().defaultTo(0)
      table.integer('opponent_score').unsigned().defaultTo(0)
      table.string('result', 1) // @values Win: 'W', Lose: 'L', Draw: 'D'
      table.timestamps()
    })
  }

  down () {
    this.drop('matches')
  }
}

module.exports = MatchsSchema
