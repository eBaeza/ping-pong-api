const { ServiceProvider } = require('@adonisjs/fold')


class ExtendValidatorProvider extends ServiceProvider {
  boot () {
    const Validator = use('Validator')

    Validator.extend('exists', this.existsRule)
    Validator.extend('minNumber', this.minNumberRule)
    Validator.extend('notEqualTo', this.notEqualToRule)
  }

  async existsRule (data, field, message, [table, column], get) {
    const DB = use('Database')
    const value = get(data, field)

    if (!value) { return }

    const row = await DB.table(table).where(column, value).first()
    const customMessage = `The ${field} dosen't exists in ${table}`

    if (!row) { throw customMessage }
  }

  async minNumberRule (data, field, message, [min], get) {
    const value = get(data, field)
    const customMessage = `The minimum of ${field} must be ${min}`

    if (!value) { return }
    if (value < Number(min)) { throw customMessage }
  }

  async notEqualToRule (data, field, message, [otherField], get) {
    const value = get(data, field)
    const otherValue = get(data, otherField)

    const customMessage = `The ${field} should not be equal to ${otherField}`

    if (value === otherValue) { throw customMessage }
  }
}

module.exports = ExtendValidatorProvider
