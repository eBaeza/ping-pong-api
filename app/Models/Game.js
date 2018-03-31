'use strict'

const Model = use('Model')

class Game extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeCreate', 'GameHook.setResult')
    this.addHook('beforeSave', 'GameHook.setResult')
  }

  player () {
    return this.belongsTo('App/Models/User', 'player_id', 'id')
  }

  opponent () {
    return this.belongsTo('App/Models/User', 'opponent_id', 'id')
  }
}

module.exports = Game
