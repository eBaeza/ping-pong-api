'use strict'

class BaseValidator {
  get validateAll () {
    return true
  }

  async fails (errorMessages) {
    return this.ctx.response.status(400).send({
      status: 'fail',
      data: errorMessages
    })
  }
}

module.exports = BaseValidator
