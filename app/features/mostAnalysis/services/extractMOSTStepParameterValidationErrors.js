import {Map} from 'immutable';
import mostParameterValidationErrorKeyRegExp from '../constants/mostParameterValidationErrorKeyRegExp';

export default function (validationErrors) {
  const parameterValidationErrors = Map().asMutable();

  validationErrors
    .filter((_, key) => mostParameterValidationErrorKeyRegExp.test(key))
    .forEach((value, key) => {
      const matches = mostParameterValidationErrorKeyRegExp.exec(key);
      const phaseNumber = Number(matches[1]) + 1;
      const parameterNumber = Number(matches[2]) + 1;
      const parameterPropertyName = `${matches[3][0].toLowerCase()}${matches[3].substr(1)}`;

      const parameterValidationErrorKey = `${phaseNumber}-${parameterNumber}`;

      if (!parameterValidationErrors.has(parameterValidationErrorKey)) {
        parameterValidationErrors.set(parameterValidationErrorKey, Map());
      }

      parameterValidationErrors.setIn([parameterValidationErrorKey, parameterPropertyName], value);
    });

  return parameterValidationErrors.asImmutable();
}
