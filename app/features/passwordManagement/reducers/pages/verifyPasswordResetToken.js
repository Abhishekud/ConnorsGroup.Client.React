import {Map} from 'immutable';
import {
  VERIFY_PASSWORD_RESET_TOKEN_PENDING,
  VERIFY_PASSWORD_RESET_TOKEN_REJECTED,
} from '../../actions';

const initialState = new Map({
  invalidToken: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case VERIFY_PASSWORD_RESET_TOKEN_PENDING:
      return initialState;

    case VERIFY_PASSWORD_RESET_TOKEN_REJECTED:
      return initialState.set('invalidToken', true);

    default:
      return state;
  }
}
