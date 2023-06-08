import {Map, fromJS} from 'immutable';
import {
  SHOW_MOVE_STANDARD_ITEM_TO_POSITION,
  CANCEL_MOVE_STANDARD_ITEM_TO_POSITION,
  SET_MOVE_STANDARD_ITEM_TO_POSITION_MODEL_PROPERTY,
  MOVE_STANDARD_ITEM_PENDING,
  MOVE_STANDARD_ITEM_FULFILLED,
  MOVE_STANDARD_ITEM_REJECTED,
} from '../../actions';
import {INSERT_ABOVE_TARGET_ITEM} from '../../../shared/constants/moveToPositionBehaviors';

const initialState = new Map({
  show: false,
  saving: false,
  model: new Map({
    id: null,
    standardId: null,
    position: null,
    insertBehavior: INSERT_ABOVE_TARGET_ITEM,
  }),
  validationErrors: new Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_MOVE_STANDARD_ITEM_TO_POSITION: {
      const {standardId, standardItemId} = action.payload;
      return initialState.withMutations(map =>
        map.set('show', true)
          .setIn(['model', 'id'], standardItemId)
          .setIn(['model', 'standardId'], standardId));
    }

    case CANCEL_MOVE_STANDARD_ITEM_TO_POSITION:
    case MOVE_STANDARD_ITEM_FULFILLED:
      return initialState;

    case SET_MOVE_STANDARD_ITEM_TO_POSITION_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case MOVE_STANDARD_ITEM_PENDING:
      return state.set('saving', true);

    case MOVE_STANDARD_ITEM_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}


