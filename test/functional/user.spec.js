'use strict'

const { test, trait } = use('Test/Suite')('User routes')
const Game = use('App/Models/Game')
const User = use('App/Models/User')

trait('DatabaseTransactions')
trait('Auth/Client')
trait('Test/ApiClient')

test('Get list of user with statics', async ({ client }) => {
  const user = await User.find(1)
  await Game.createMany([{
    player_id: 1,
    opponent_id: 2,
    player_score: 6,
    opponent_score: 9
  }, {
    player_id: 1,
    opponent_id: 3,
    player_score: 8,
    opponent_score: 1
  }, {
    player_id: 1,
    opponent_id: 3,
    player_score: 12,
    opponent_score: 7
  }])

  const response = await client.get('/users').loginVia(user, 'jwt').end()

  response.assertStatus(200)
  response.assertJSONSubset({
    status: 'success',
    data: [{
      id: 1,
      username: 'edgarbaeza',
      email: 'holamundo@edgarbaeza.mx',
      total_games: 3,
      win_games: 2,
      lose_games: 1
    }]
  })
})
