import {fromJS, Map} from 'immutable';
import {
  LOAD_ALLOWANCE_RESTS_LIST_FULFILLED,
  SELECT_ALLOWANCE_REST,
  CLEAR_SELECTED_ALLOWANCE_REST,
  CLOSE_ALLOWANCE_RESTS_LIST_EDIT_SIDEBAR,
  SET_EDIT_ALLOWANCE_REST_MODEL_PROPERTY,
  UPDATE_ALLOWANCE_REST_PENDING,
  UPDATE_ALLOWANCE_REST_FULFILLED,
  UPDATE_ALLOWANCE_REST_REJECTED,
} from '../../actions';

const initialState = Map({
  show: false,
  editing: false,
  saving: false,
  pristineModel: Map(),
  workingModel: Map(),
  validationErrors: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_SELECTED_ALLOWANCE_REST:
    case CLOSE_ALLOWANCE_RESTS_LIST_EDIT_SIDEBAR:
    case LOAD_ALLOWANCE_RESTS_LIST_FULFILLED:
    case UPDATE_ALLOWANCE_REST_FULFILLED:
      return initialState;

    case SELECT_ALLOWANCE_REST:
      return state.withMutations(map =>
        map.set('show', true)
          .set('saving', false)
          .set('model', action.payload)
          .set('validationErrors', Map()));

    case SET_EDIT_ALLOWANCE_REST_MODEL_PROPERTY: {
      const {name, value, message} = action.payload;
      return state.withMutations(map => {
        map.setIn(['model', name], value);
        if (message && name === 'name') {
          map.setIn(['validationErrors', name], fromJS([message]));
        }
      }
      );
    }

    case UPDATE_ALLOWANCE_REST_PENDING:
      return state.set('saving', true);

    case UPDATE_ALLOWANCE_REST_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
