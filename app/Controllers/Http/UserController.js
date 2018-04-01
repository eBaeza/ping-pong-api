'use strict'

const { CREATED, OK } = require('http-status')

const User = use('App/Models/User')

class UserController {
  async index ({ request, response }) {
    const users = await User.query()
      .withGameStatistics()
      .paginate(+request.input('page', 1))

    return response.status(OK).send({
      status: 'success',
      ...users.toJSON()
    })
  }

  async store ({ request, response }) {
    const user = await User.create(request.all())

    return response.status(CREATED).send({
      status: 'success',
      data: user
    })
  }

  async show ({ response, params: { id } }) {
    const user = await User.findOrFail(id)

    await user.loadMany(['localGames.opponent', 'visitorGames.player'])

    return response.send({
      status: 'success',
      data: user
    })
  }

  async update ({ request, response, params: { id } }) {
    const user = await User.findOrFail(id)
    const { username, email } = request.post()

    await user.merge({
      username,
      email
    })

    await user.save()

    return response.status(CREATED).send({
      status: 'success',
      data: user
    })
  }

  async destroy ({ response, params: { id } }) {
    const user = await User.findOrFail(id)
    await user.delete()

    return response.status(OK).send({
      status: 'success',
      data: null
    })
  }
}

module.exports = UserController
