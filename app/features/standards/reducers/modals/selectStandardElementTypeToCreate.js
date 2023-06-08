import {Map} from 'immutable';
import {ESTIMATE} from '../../../elements/constants/elementTypes';
import {
  CANCEL_SELECT_STANDARD_ELEMENT_TYPE_TO_CREATE,
  SET_SELECT_STANDARD_ELEMENT_TYPE_TO_CREATE_MODEL_PROPERTY,
  SHOW_SELECT_STANDARD_ELEMENT_TYPE_TO_CREATE,
  SHOW_CREATE_STANDARD_ELEMENT,
} from '../../actions';

const initialState = new Map({
  show: false,
  model: new Map({
    standardElementType: ESTIMATE,
    insertAtIndex: null,
    elementGroupId: null,
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_SELECT_STANDARD_ELEMENT_TYPE_TO_CREATE: {
      const {insertAtIndex, elementGroupId} = action.payload;

      return initialState.withMutations(map =>
        map.set('show', true)
          .setIn(['model', 'insertAtIndex'], insertAtIndex)
          .setIn(['model', 'elementGroupId'], elementGroupId));
    }

    case SET_SELECT_STANDARD_ELEMENT_TYPE_TO_CREATE_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case CANCEL_SELECT_STANDARD_ELEMENT_TYPE_TO_CREATE:
    case SHOW_CREATE_STANDARD_ELEMENT:
      return initialState;

    default:
      return state;
  }
}
