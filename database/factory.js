'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')

Factory.blueprint('App/Models/User', async faker => ({
  username: faker.username(),
  email: faker.email(),
  password: 'pingpong'
}))

Factory.blueprint('App/Models/Match', async faker => {
  const [player_id, opponent_id] = faker.unique(faker.integer, 2, { min: 1, max: 31 })
  return {
    player_id,
    opponent_id,
    player_score: faker.integer({ min: 0, max: 20 }),
    opponent_score: faker.integer({ min: 0, max: 20 })
  }
})
