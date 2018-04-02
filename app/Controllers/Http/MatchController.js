'use strict'

const { CREATED, OK } = require('http-status')

const Match = use('App/Models/Match')

class MatchController {
  async index ({ response, request }) {
    const matches = await Match.query()
      .with('player')
      .with('opponent')
      .orderBy('created_at', 'desc')
      .paginate(+request.input('page', 1))

    return response.status(OK).send({
      status: 'success',
      ...matches.toJSON()
    })
  }

  async store ({ request, response }) {
    const match = new Match()
    const { player_id, opponent_id, player_score, opponent_score } = request.post()

    match.fill({
      player_id,
      opponent_id,
      player_score,
      opponent_score
    })

    await match.save()
    await match.loadMany(['player', 'opponent'])

    return response.status(CREATED).send({
      status: 'success',
      data: match
    })
  }

  async show ({ response, params: { id } }) {
    const match = await Match.query()
      .where('id', id)
      .with('player')
      .with('opponent')
      .firstOrFail()

    return response.status(OK).send({
      status: 'success',
      data: match
    })
  }

  async update ({ request, response, params: { id } }) {
    const match = await Match.findOrFail(id)
    const { player_id, opponent_id, player_score, opponent_score } = request.post()

    match.merge({
      player_id,
      opponent_id,
      player_score,
      opponent_score
    })

    await match.save()
    await match.loadMany(['player', 'opponent'])

    return response.status(OK).send({
      status: 'success',
      data: match
    })
  }

  async destroy ({ response, params: { id } }) {
    const match = await Match.findOrFail(id)
    await match.delete()

    return response.status(OK).send({
      status: 'success',
      data: null
    })
  }
}

module.exports = MatchController
