import {List} from 'immutable';

export default function (propertyValidationErrorsMap) {
  const validationErrors = new List().asMutable();
  propertyValidationErrorsMap.forEach(fieldErrors => fieldErrors.forEach(error => validationErrors.push(error)));
  return validationErrors.asImmutable();
}
