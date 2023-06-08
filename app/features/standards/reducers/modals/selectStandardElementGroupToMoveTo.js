import {Map, fromJS} from 'immutable';
import {
  SHOW_SELECT_STANDARD_ELEMENT_GROUP_TO_MOVE_TO,
  CANCEL_SELECT_STANDARD_ELEMENT_GROUP_TO_MOVE_TO,
  SET_SELECT_STANDARD_ELEMENT_GROUP_TO_MOVE_TO_MODEL_PROPERTY,
  MOVE_STANDARD_ELEMENT_TO_GROUP_PENDING,
  MOVE_STANDARD_ELEMENT_TO_GROUP_FULFILLED,
  MOVE_STANDARD_ELEMENT_TO_GROUP_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  saving: false,
  model: new Map({
    standardId: null,
    standardElementId: null,
    standardElementGroupId: null,
  }),
  validationErrors: new Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_SELECT_STANDARD_ELEMENT_GROUP_TO_MOVE_TO: {
      const {standardId, standardElementId} = action.payload;

      return initialState.withMutations(map =>
        map.set('show', true)
          .setIn(['model', 'standardId'], standardId)
          .setIn(['model', 'standardElementId'], standardElementId));
    }

    case SET_SELECT_STANDARD_ELEMENT_GROUP_TO_MOVE_TO_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case CANCEL_SELECT_STANDARD_ELEMENT_GROUP_TO_MOVE_TO:
    case MOVE_STANDARD_ELEMENT_TO_GROUP_FULFILLED:
      return initialState;

    case MOVE_STANDARD_ELEMENT_TO_GROUP_PENDING:
      return state.set('saving', true);

    case MOVE_STANDARD_ELEMENT_TO_GROUP_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
