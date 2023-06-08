import {
  CANCEL_CREATE_VOLUME_DRIVER_VALUE_SET,
  CREATE_VOLUME_DRIVER_VALUE_SET_PENDING,
  CREATE_VOLUME_DRIVER_VALUE_SET_FULFILLED,
  CREATE_VOLUME_DRIVER_VALUE_SET_REJECTED,
  SHOW_CREATE_VOLUME_DRIVER_VALUE_SET,
  SET_CREATE_VOLUME_DRIVER_VALUE_SET_MODEL_PROPERTY,
  TOGGLE_CONFIRM_DEFAULT_VOLUME_DRIVER_VALUE_SET,
  LOAD_VOLUME_DRIVER_VALUE_SETS_LIST_FULFILLED,
} from '../../actions';
import {fromJS, Map} from 'immutable';

const initialState = new Map({
  show: false,
  showConfirmDefault: false,
  saving: false,
  validationErrors: new Map(),
  model: new Map({
    name: '',
    description: '',
    isDefault: false,
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_VOLUME_DRIVER_VALUE_SET:
      return initialState.set('show', true);

    case SET_CREATE_VOLUME_DRIVER_VALUE_SET_MODEL_PROPERTY: {
      const {name, value, message} = action.payload;
      return state.withMutations(map => {
        map.setIn(['model', name], value);
        if (message && name === 'name') {
          map.setIn(['validationErrors', name], fromJS([message]));
        }
      }
      );
    }

    case CREATE_VOLUME_DRIVER_VALUE_SET_PENDING:
      return state.set('saving', true);

    case CANCEL_CREATE_VOLUME_DRIVER_VALUE_SET:
    case CREATE_VOLUME_DRIVER_VALUE_SET_FULFILLED:
      return initialState;

    case CREATE_VOLUME_DRIVER_VALUE_SET_REJECTED:
      return state.withMutations(map => {
        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : initialState.get('validationErrors'))
          .set('saving', false);
      });

    case TOGGLE_CONFIRM_DEFAULT_VOLUME_DRIVER_VALUE_SET:
      return state.update('showConfirmDefault', showConfirmDefault => !showConfirmDefault);

    case LOAD_VOLUME_DRIVER_VALUE_SETS_LIST_FULFILLED:
      return initialState;

    default:
      return state;
  }
}
