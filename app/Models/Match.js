'use strict'

const Model = use('Model')

class Match extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeCreate', 'MatchHook.setResult')
    this.addHook('beforeSave', 'MatchHook.setResult')
  }

  player () {
    return this.belongsTo('App/Models/User', 'player_id', 'id')
  }

  opponent () {
    return this.belongsTo('App/Models/User', 'opponent_id', 'id')
  }
}

module.exports = Match
