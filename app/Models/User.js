'use strict'

const Model = use('Model')
const DB = use('Database')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     *
     * Look at `app/Models/Hooks/User.js` file to
     * check the hashPassword method
     */
    this.addHook('beforeCreate', 'UserHook.hashPassword')
  }

  static get hidden () {
    return ['password']
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  static scopeWithMatchStatistics (builder) {
    return builder
      .select('users.*')
      .select(DB.raw(`
        Count (matches.id)::integer AS total_matches,
        Count (matches.id) FILTER (
          WHERE (matches.result = 'W' and matches.player_id = users.id)
          OR (matches.result = 'L' and matches.opponent_id = users.id)
        )::integer AS win_matches,
        Count (matches.id) FILTER (
          WHERE (matches.result = 'L' and matches.player_id = users.id)
          OR (matches.result = 'W' and matches.opponent_id = users.id)
        )::integer AS lose_matches
      `))
      .leftJoin('matches', query => {
        query
          .on('users.id', 'matches.player_id')
          .orOn('users.id', 'matches.opponent_id')
      })
      .groupBy('users.id')
      .orderBy('total_matches', 'desc')
      .orderBy('win_matches', 'desc')
      .orderBy('lose_matches', 'asc')
  }

  localMatchs () {
    return this.hasMany('App/Models/Match', 'id', 'player_id')
  }

  visitorMatchs () {
    return this.hasMany('App/Models/Match', 'id', 'opponent_id')
  }
}

module.exports = User
