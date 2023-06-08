import {fromJS, Map} from 'immutable';
import {modelsArrayToMapById} from '../../../shared/services';
import {
  createAttributeState,
  createAttributeStates,
} from '../../services';
import {
  LOAD_ATTRIBUTES_LIST_FULFILLED,
  TOGGLE_ATTRIBUTES_SIDEBAR,
  CREATE_ATTRIBUTE_FULFILLED,
  EDIT_ATTRIBUTE,
  SET_ATTRIBUTE_MODEL_PROPERTY,
  CANCEL_EDIT_ATTRIBUTE,
  UPDATE_ATTRIBUTE_PENDING,
  UPDATE_ATTRIBUTE_FULFILLED,
  UPDATE_ATTRIBUTE_REJECTED,
  DELETE_ATTRIBUTE_FULFILLED,
} from '../../actions';

const initialState = Map({
  show: false,
  attributes: Map(),
  pristineAttributes: Map(),
  attributeStates: Map(),
  attributesValidationErrors: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_ATTRIBUTES_SIDEBAR:
      return state.set('show', !state.get('show'));

    case LOAD_ATTRIBUTES_LIST_FULFILLED: {
      const attributes = action.payload.data;
      const attributesMap = modelsArrayToMapById(attributes);

      return state.withMutations(map =>
        map.set('attributes', attributesMap)
          .set('pristineAttributes', attributesMap)
          .set('attributeStates', createAttributeStates(attributes)));
    }

    case CREATE_ATTRIBUTE_FULFILLED: {
      const attribute = action.payload.data;
      const attributeMap = fromJS(attribute);

      return state.withMutations(map => {
        map.setIn(['attributes', attribute.id], attributeMap);
        map.setIn(['pristineAttributes', attribute.id], attributeMap);
        map.setIn(['attributeStates', attribute.id], createAttributeState());
      });
    }

    case EDIT_ATTRIBUTE: {
      const id = action.payload;
      return state.withMutations(map =>
        map.setIn(['attributeStates', id, 'editing'], true)
          .setIn(['pristineAttributes', id], map.getIn(['attributes', id])));
    }

    case SET_ATTRIBUTE_MODEL_PROPERTY: {
      const {attributeId: id, name, value} = action.payload;

      return state.setIn(['attributes', id, name], value);
    }

    case CANCEL_EDIT_ATTRIBUTE: {
      const id = action.payload;

      return state.withMutations(map =>
        map.setIn(['attributeStates', id, 'editing'], false)
          .setIn(['attributes', id], map.getIn(['pristineAttributes', id]))
          .deleteIn(['attributesValidationErrors', id]));
    }

    case UPDATE_ATTRIBUTE_PENDING: {
      const id = action.payload;

      return state.setIn(['attributeStates', id, 'saving'], true);
    }

    case UPDATE_ATTRIBUTE_FULFILLED: {
      const attribute = action.payload.data;
      const id = attribute.id;
      const attributeMap = fromJS(attribute);

      return state.withMutations(map => {
        map.setIn(['attributes', id], attributeMap)
          .setIn(['pristineAttributes', id], attributeMap)
          .setIn(['attributeStates', id, 'editing'], false)
          .setIn(['attributeStates', id, 'saving'], false)
          .deleteIn(['attributesValidationErrors', id]);
      });
    }

    case UPDATE_ATTRIBUTE_REJECTED: {
      const {payload} = action;
      const {status, data} = payload.response || {};
      const attributeId = Number(/\d+$/.exec(payload.config.url)[0]);

      return state.withMutations(map => {
        map.setIn(['attributeStates', attributeId, 'saving'], false);

        if (status === 400) {
          map.setIn(['attributesValidationErrors', attributeId], fromJS(data));
        } else {
          map.deleteIn(['attributesValidationErrors', attributeId]);
        }
      });
    }

    case DELETE_ATTRIBUTE_FULFILLED: {
      const id = action.payload.data;

      return state.withMutations(map => {
        map.deleteIn(['attributes', id])
          .deleteIn(['pristineAttributes', id])
          .deleteIn(['attributeStates', id])
          .deleteIn(['attributesValidationErrors', id]);
      });
    }

    default:
      return state;
  }
}
