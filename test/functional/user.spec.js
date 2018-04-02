'use strict'

const { test, trait } = use('Test/Suite')('User routes')
const Match = use('App/Models/Match')
const User = use('App/Models/User')

trait('DatabaseTransactions')
trait('Auth/Client')
trait('Test/ApiClient')

test('Get list of user with statics', async ({ client }) => {
  const user = await User.find(1)
  await Match.createMany([{
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
      total_matches: 3,
      won_matches: 2,
      lost_matches: 1,
      percentage_won_matches: ((2 * 100) / 3).toFixed(2)
    }]
  })
})
