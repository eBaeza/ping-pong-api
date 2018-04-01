'use strict'

const BaseValidator = use('App/Validators/BaseValidator')

class UpdateUser extends BaseValidator {
  get rules () {
    const { id } = this.ctx.params
    return {
      username: `required|alphaNumeric|unique:users,username,id,${id}`,
      email: `required|email|unique:users,email,id,${id}`
    }
  }
}

module.exports = UpdateUser
