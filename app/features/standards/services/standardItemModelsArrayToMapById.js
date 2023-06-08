import {Map} from 'immutable';
import {StandardElementModel, StandardElementGroupModel} from '../models';
import {STANDARD_ELEMENT, STANDARD_ELEMENT_GROUP} from '../constants/standardItemTypes';

export default function (models) {
  const result = new Map().asMutable();

  for (const model of models) {
    switch (model.type) {
      case STANDARD_ELEMENT:
        result.set(model.id, new StandardElementModel(model));
        break;
      case STANDARD_ELEMENT_GROUP:
        result.set(model.id, new StandardElementGroupModel(model));
        break;
    }
  }

  return result.asImmutable();
}
