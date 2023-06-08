import {Map, fromJS} from 'immutable';
import {
  LOAD_VOLUME_DRIVER_VALUE_SETS_LIST_FULFILLED,
  CLEAR_SELECTED_VOLUME_DRIVER_VALUE_SET,
  CLOSE_VOLUME_DRIVER_VALUE_SET_LIST_EDIT_SIDEBAR,
  SELECT_VOLUME_DRIVER_VALUE_SET,
  SET_EDIT_VOLUME_DRIVER_VALUE_SET_MODEL_PROPERTY,
  UPDATE_VOLUME_DRIVER_VALUE_SET_FULFILLED,
  UPDATE_VOLUME_DRIVER_VALUE_SET_PENDING,
  UPDATE_VOLUME_DRIVER_VALUE_SET_REJECTED,
  TOGGLE_CONFIRM_DEFAULT_VOLUME_DRIVER_VALUE_SET,
} from '../../actions';

const initialState = Map({
  show: false,
  saving: false,
  model: Map(),
  validationErrors: Map(),
  showConfirmDefault: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_SELECTED_VOLUME_DRIVER_VALUE_SET:
    case CLOSE_VOLUME_DRIVER_VALUE_SET_LIST_EDIT_SIDEBAR:
    case LOAD_VOLUME_DRIVER_VALUE_SETS_LIST_FULFILLED:
    case UPDATE_VOLUME_DRIVER_VALUE_SET_FULFILLED:
      return initialState;

    case SELECT_VOLUME_DRIVER_VALUE_SET:
      return state.withMutations(map =>
        map.set('show', true)
          .set('saving', false)
          .set('model', action.payload)
          .setIn(['model', 'isDefaultDisabled'], action.payload.get('isDefault'))
          .set('validationErrors', initialState.get('validationErrors')));

    case UPDATE_VOLUME_DRIVER_VALUE_SET_PENDING:
      return state.set('saving', true);

    case UPDATE_VOLUME_DRIVER_VALUE_SET_REJECTED: {
      const {status, data} = action.payload.response || {};
      return state.withMutations(map => {
        map.set('validationErrors', status === 400 ? fromJS(data) : initialState.get('validationErrors'))
          .set('saving', false);
      });
    }

    case SET_EDIT_VOLUME_DRIVER_VALUE_SET_MODEL_PROPERTY: {
      const {name, value, message} = action.payload;
      return state.withMutations(map => {
        map.setIn(['model', name], value);
        if (message && name === 'name') {
          map.setIn(['validationErrors', name], fromJS([message]));
        }
      }
      );
    }

    case TOGGLE_CONFIRM_DEFAULT_VOLUME_DRIVER_VALUE_SET:
      return state.update('showConfirmDefault', showConfirmDefault => !showConfirmDefault);

    default:
      return state;
  }
}
