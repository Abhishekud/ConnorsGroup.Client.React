import {Map} from 'immutable';

export default function (models, ModelRecord, idPropertyName = 'id') {
  const result = new Map().asMutable();

  for (const model of models) {
    result.set(model[idPropertyName], new ModelRecord(model));
  }

  return result.asImmutable();
}
