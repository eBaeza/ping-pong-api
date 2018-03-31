'use strict'

class UserController {
  async login ({ request, response, auth }) {
    const { email, password } = request.all()
    const authData = await auth.attempt(email, password)

    return response.send({
      status: 'success',
      data: authData
    })
  }
}

module.exports = UserController
