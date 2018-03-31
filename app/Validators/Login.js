'use strict'

const BaseValidators = use('App/Validators/BaseValidator')

class Login extends BaseValidators {
  get rules () {
    return {
      email: 'required|email',
      password: 'required|string'
    }
  }
}

module.exports = Login
