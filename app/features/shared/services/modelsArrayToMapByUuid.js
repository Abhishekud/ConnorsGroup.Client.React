import {fromJS, Map} from 'immutable';

export default function (models) {
  const result = new Map().asMutable();

  for (const model of models) {
    result.set(model.uuid, fromJS(model));
  }

  return result.asImmutable();
}
