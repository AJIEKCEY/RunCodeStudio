import JsonSchemaValidator from 'ajv'
import { ValidationError } from '../errors'

export const validate = <T = any>(schema: any, data: T) => {
  const jsonSchemaValidator = new JsonSchemaValidator()

  const isDataValid = jsonSchemaValidator.validate(schema, data)

  if (!isDataValid) {
    throw new ValidationError(
      jsonSchemaValidator.errorsText(jsonSchemaValidator.errors)
    )
  }
}
