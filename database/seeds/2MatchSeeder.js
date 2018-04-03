'use strict'

/*
|--------------------------------------------------------------------------
| MatchSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class MatchSeeder {
  async run () {
    await Factory.model('App/Models/Match').createMany(200)
  }
}

module.exports = MatchSeeder
