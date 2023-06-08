import {fromJS, Map, List} from 'immutable';
import {authenticationMethods} from '../../constants';
import {
  LOAD_AUTHENTICATION_METHOD_PENDING,
  LOAD_AUTHENTICATION_METHOD_REJECTED,
  LOAD_AUTHENTICATION_METHOD_FULFILLED,
  LOGIN_FULFILLED,
  LOGIN_PENDING,
  LOGIN_REJECTED,
  RESET_LOGIN_FORM,
  SET_LOGIN_FORM_FIELD,
} from '../../actions';

const initialState = new Map({
  loading: false,
  submitting: false,
  validationErrors: new Map(),
  model: new Map({
    email: '',
    password: '',
  }),
  authenticationMethod: authenticationMethods.PASSWORD,
  ssoIdentityProviders: List(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case RESET_LOGIN_FORM:
      return initialState;

    case LOAD_AUTHENTICATION_METHOD_PENDING:
      return state.set('loading', true);

    case LOAD_AUTHENTICATION_METHOD_REJECTED:
      return state.set('loading', false);

    case LOAD_AUTHENTICATION_METHOD_FULFILLED:
      return state.withMutations(map => {
        map.set('loading', false);

        const {authenticationMethod, ssoIdentityProviders} = action.payload.data;
        map.set('authenticationMethod', authenticationMethod);
        map.set('ssoIdentityProviders', List(ssoIdentityProviders));
      });

    case SET_LOGIN_FORM_FIELD:
      return state.setIn(['model', action.payload.name], action.payload.value);

    case LOGIN_PENDING:
      return state.set('submitting', true);

    case LOGIN_FULFILLED:
      return initialState;

    case LOGIN_REJECTED:
      return state.withMutations(map => {
        map.set('submitting', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
