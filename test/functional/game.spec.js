'use strict'

const { test, trait } = use('Test/Suite')('Game routes')
const Game = use('App/Models/Game')
const User = use('App/Models/User')

trait('DatabaseTransactions')
trait('Auth/Client')
trait('Test/ApiClient')

test('Get list of games', async ({ client }) => {
  const user = await User.find(1)
  const game = await Game.create({
    player_id: 1,
    opponent_id: 2,
    player_score: 6,
    opponent_score: 9
  })

  const response = await client.get('/games')
    .loginVia(user, 'jwt').end()

  response.assertStatus(200)
  response.assertJSONSubset({
    status: 'success',
    data: [{
      id: game.id,
      player_id: 1,
      opponent_id: 2,
      player_score: 6,
      opponent_score: 9,
      result: 'L',
      player: { id: 1 },
      opponent: { id: 2 }
    }]
  })
})

test('Create a new game', async ({ client }) => {
  const user = await User.find(1)
  const response = await client.post('/games')
    .loginVia(user, 'jwt').send({
      player_id: 1,
      opponent_id: 2,
      player_score: 5,
      opponent_score: 3
    }).end()

  response.assertStatus(201)
  response.assertJSONSubset({
    status: 'success',
    data: {
      player_id: 1,
      opponent_id: 2,
      player_score: 5,
      opponent_score: 3,
      result: 'W',
      player: { id: 1 },
      opponent: { id: 2 }
    }
  })
})
