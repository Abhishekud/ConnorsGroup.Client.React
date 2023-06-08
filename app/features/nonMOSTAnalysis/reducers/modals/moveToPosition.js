import {Map, fromJS} from 'immutable';
import {
  SHOW_MOVE_NON_MOST_STEP_TO_POSITION,
  CANCEL_MOVE_NON_MOST_STEP_TO_POSITION,
  SET_MOVE_NON_MOST_STEP_TO_POSITION_MODEL_PROPERTY,
  MOVE_NON_MOST_STEP_PENDING,
  MOVE_NON_MOST_STEP_FULFILLED,
  MOVE_NON_MOST_STEP_REJECTED,
} from '../../actions';
import {INSERT_ABOVE_TARGET_ITEM} from '../../../shared/constants/moveToPositionBehaviors';

const initialState = new Map({
  show: false,
  saving: false,
  model: new Map({
    id: null,
    position: null,
    insertBehavior: INSERT_ABOVE_TARGET_ITEM,
  }),
  validationErrors: new Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_MOVE_NON_MOST_STEP_TO_POSITION: {
      const {nonMOSTStepId} = action.payload;
      return initialState.withMutations(map =>
        map.set('show', true)
          .setIn(['model', 'id'], nonMOSTStepId));
    }

    case CANCEL_MOVE_NON_MOST_STEP_TO_POSITION:
    case MOVE_NON_MOST_STEP_FULFILLED:
      return initialState;

    case SET_MOVE_NON_MOST_STEP_TO_POSITION_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case MOVE_NON_MOST_STEP_PENDING:
      return state.set('saving', true);

    case MOVE_NON_MOST_STEP_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
