import {Map} from 'immutable';
import {
  DISABLE_ACCOUNT_FULFILLED,
  DISABLE_ACCOUNT_PENDING,
  DISABLE_ACCOUNT_REJECTED,
} from '../../actions';

const initialState = new Map({
  submitting: false,
  invalidToken: false,
  accountDisabled: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case DISABLE_ACCOUNT_PENDING:
      return initialState.set('submitting', true);

    case DISABLE_ACCOUNT_FULFILLED:
      return initialState.withMutations(map =>
        map.set('submitting', false)
          .set('accountDisabled', true));

    case DISABLE_ACCOUNT_REJECTED:
      return initialState.withMutations(map =>
        map.set('submitting', false)
          .set('invalidToken', true));

    default:
      return state;
  }
}
