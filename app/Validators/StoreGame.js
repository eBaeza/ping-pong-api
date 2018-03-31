'use strict'

class StoreGame {
  get rules () {
    return {
      player_id: 'required|integer|exists:users,id',
      opponent_id: 'required|integer|notEqualTo:player_id|exists:users,id',
      player_score: 'required|integer|minNumber:0',
      opponent_score: 'required|integer|minNumber:0'
    }
  }

  get validateAll () {
    return true
  }

  async fails (errorMessages) {
    return this.ctx.response.status(400).send({
      status: 'fail',
      data: errorMessages
    })
  }
}

module.exports = StoreGame
