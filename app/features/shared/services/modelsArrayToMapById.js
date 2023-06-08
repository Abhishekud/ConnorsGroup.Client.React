import {fromJS, Map} from 'immutable';

export default function (models, idPropertyName = 'id') {
  const result = new Map().asMutable();

  for (const model of models) {
    result.set(model[idPropertyName], fromJS(model));
  }

  return result.asImmutable();
}
