import {
  CANCEL_SET_USER_PASSWORD,
  SET_SET_USER_PASSWORD_MODEL_PROPERTY,
  SET_USER_PASSWORD_FULFILLED,
  SET_USER_PASSWORD_PENDING,
  SET_USER_PASSWORD_REJECTED,
  SHOW_SET_USER_PASSWORD,
} from '../../actions';
import {fromJS, Map} from 'immutable';

const initialState = new Map({
  show: false,
  saving: false,
  validationErrors: new Map(),
  model: new Map({
    userId: 0,
    email: '',
    password: '',
    confirmPassword: '',
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_SET_USER_PASSWORD:
      return state.withMutations(map =>
        map.set('show', true)
          .setIn(['model', 'userId'], action.payload.get('id'))
          .setIn(['model', 'email'], action.payload.get('email'))
      );

    case SET_SET_USER_PASSWORD_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case SET_USER_PASSWORD_PENDING:
      return state.set('saving', true);

    case CANCEL_SET_USER_PASSWORD:
    case SET_USER_PASSWORD_FULFILLED:
      return initialState;

    case SET_USER_PASSWORD_REJECTED:
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
