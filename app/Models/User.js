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

  static scopeWithGameStatistics (builder) {
    return builder
      .select('users.*')
      .select(DB.raw(`
        Count (games.id)::integer AS total_games,
        Count (games.id) FILTER (
          WHERE (games.result = 'W' and games.player_id = users.id)
          OR (games.result = 'L' and games.opponent_id = users.id)
        )::integer AS win_games,
        Count (games.id) FILTER (
          WHERE (games.result = 'L' and games.player_id = users.id)
          OR (games.result = 'W' and games.opponent_id = users.id)
        )::integer AS lose_games
      `))
      .leftJoin('games', query => {
        query
          .on('users.id', 'games.player_id')
          .orOn('users.id', 'games.opponent_id')
      })
      .groupBy('users.id')
      .orderBy('total_games', 'desc')
      .orderBy('win_games', 'desc')
      .orderBy('lose_games', 'asc')
  }

  localGames () {
    return this.hasMany('App/Models/Game', 'id', 'player_id')
  }

  visitorGames () {
    return this.hasMany('App/Models/Game', 'id', 'opponent_id')
  }
}

module.exports = User
