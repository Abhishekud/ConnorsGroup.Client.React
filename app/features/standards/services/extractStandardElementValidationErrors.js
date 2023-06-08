import {Map} from 'immutable';
import {standardElementValidationErrorKeyRegExp} from '../constants';

export default function (validationErrors) {
  const standardElementValidationErrors = Map().asMutable();

  validationErrors
    .filter((_, key) => standardElementValidationErrorKeyRegExp.test(key))
    .forEach((value, key) => {
      const matches = standardElementValidationErrorKeyRegExp.exec(key);
      const standardElementId = Number(matches[1]);
      const propertyName = matches[2];

      if (!standardElementValidationErrors.has(standardElementId)) {
        standardElementValidationErrors.set(propertyName, Map());
      }

      standardElementValidationErrors.setIn([standardElementId, propertyName], value);
    });

  return standardElementValidationErrors.asImmutable();
}
