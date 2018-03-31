'use strict'

const { CREATED, OK } = require('http-status')

const Game = use('App/Models/Game')

class GameController {
  async index ({ response, request }) {
    const games = await Game.query()
      .orderBy('created_at', 'desc')
      .paginate(+request.input('page', 1))

    return response.status(OK).send({
      status: 'success',
      ...games.toJSON()
    })
  }

  async store ({ request, response }) {
    const game = new Game()
    const { player_id, opponent_id, player_score, opponent_score } = request.post()

    game.fill({
      player_id,
      opponent_id,
      player_score,
      opponent_score
    })

    await game.save()

    return response.status(CREATED).send({
      status: 'success',
      data: game
    })
  }

  async show ({ response, params: { id } }) {
    const game = await Game.query()
      .where('id', id)
      .with('player')
      .with('opponent')
      .firstOrFail()

    return response.status(OK).send({
      status: 'success',
      data: game
    })
  }

  async update ({ request, response, params: { id } }) {
    const game = await Game.findOrFail(id)
    const { player_id, opponent_id, player_score, opponent_score } = request.post()

    game.merge({
      player_id,
      opponent_id,
      player_score,
      opponent_score
    })

    await game.save()
    await game.loadMany(['player', 'opponent'])

    return response.status(OK).send({
      status: 'success',
      data: game
    })
  }

  async destroy ({ response, params: { id } }) {
    const game = await Game.findOrFail(id)
    await game.delete()

    return response.status(OK).send({
      status: 'success',
      data: null
    })
  }
}

module.exports = GameController
