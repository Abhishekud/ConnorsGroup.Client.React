import {
  CANCEL_CREATE_USER,
  CREATE_USER_FULFILLED,
  CREATE_USER_PENDING,
  CREATE_USER_REJECTED,
  SET_CREATE_USER_MODEL_PROPERTY,
  SHOW_CREATE_USER,
} from '../../actions';
import {fromJS, List, Map} from 'immutable';

const initialState = new Map({
  show: false,
  saving: false,
  validationErrors: new Map(),
  model: new Map({
    email: '',
    roles: new List(),
  }),
  permissionOptions: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_USER:
      return initialState.set('show', true);

    case SET_CREATE_USER_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], Array.isArray(value) ? new List(value) : value);
    }

    case CREATE_USER_PENDING:
      return state.set('saving', true);

    case CANCEL_CREATE_USER:
    case CREATE_USER_FULFILLED:
      return initialState;

    case CREATE_USER_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};

        if (status === 400) {
          map.set('validationErrors', fromJS(data));
        } else {
          map.set('validationErrors', initialState.get('validationErrors'));
        }
      });

    default:
      return state;
  }
}
