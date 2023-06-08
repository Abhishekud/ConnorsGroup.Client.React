import {fromJS, OrderedMap} from 'immutable';

export default function (models, idPropertyName = 'id') {
  const result = new OrderedMap().asMutable();

  for (const model of models) {
    result.set(model[idPropertyName], fromJS(model));
  }

  return result.asImmutable();
}
