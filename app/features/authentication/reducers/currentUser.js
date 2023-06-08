import {fromJS, List, Map} from 'immutable';
import {authenticationMethods} from '../constants';
import {
  LOAD_IDENTITY_FULFILLED,
  LOAD_IDENTITY_REJECTED,
  LOGIN_FULFILLED,
  ACCEPT_TERMS_FULFILLED,
  LOGOUT,
} from '../actions';

const initialState = new Map({
  id: 0,
  email: '',
  roles: new List(),
  permissions: new List(),
  passwordChangeRequired: false,
  acceptedTerms: false,
  authenticated: false,
  authenticationMethod: authenticationMethods.PASSWORD,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_IDENTITY_FULFILLED:
    case LOGIN_FULFILLED:
    case ACCEPT_TERMS_FULFILLED:
      return state.withMutations(map =>
        map.merge(fromJS(action.payload.data))
          .set('authenticated', true));

    case LOAD_IDENTITY_REJECTED:
    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}
