import {Map} from 'immutable';
import {
  CANCEL_PASSWORD_RESET_FULFILLED,
  CANCEL_PASSWORD_RESET_PENDING,
  CANCEL_PASSWORD_RESET_REJECTED,
} from '../../actions';

const initialState = new Map({
  submitting: false,
  invalidToken: false,
  passwordResetCanceled: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CANCEL_PASSWORD_RESET_PENDING:
      return initialState.set('submitting', true);

    case CANCEL_PASSWORD_RESET_FULFILLED:
      return initialState.withMutations(map =>
        map.set('submitting', false)
          .set('passwordResetCanceled', true));

    case CANCEL_PASSWORD_RESET_REJECTED:
      return initialState.withMutations(map =>
        map.set('submitting', false)
          .set('invalidToken', true));

    default:
      return state;
  }
}
