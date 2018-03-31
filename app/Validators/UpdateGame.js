'use strict'

const BaseValidators = use('App/Validators/BaseValidator')

class StoreGame extends BaseValidators {
  get rules () {
    return {
      player_id: 'required|integer|exists:users,id',
      opponent_id: 'required|integer|notEqualTo:player_id|exists:users,id',
      player_score: 'required|integer|minNumber:0',
      opponent_score: 'required|integer|minNumber:0'
    }
  }
}

module.exports = StoreGame
