'use strict'

const BaseValidator = use('App/Validators/BaseValidator')

class StoreUser extends BaseValidator {
  get rules () {
    return {
      username: 'required|alphaNumeric|unique:users,username',
      email: 'required|email|unique:users,email',
      password: 'required|string'
    }
  }
}

module.exports = StoreUser
