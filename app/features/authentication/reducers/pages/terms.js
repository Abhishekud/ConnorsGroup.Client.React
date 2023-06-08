import {Map} from 'immutable';
import {
  ACCEPT_TERMS_PENDING,
  ACCEPT_TERMS_FULFILLED,
  ACCEPT_TERMS_REJECTED,
} from '../../actions';

const initialState = new Map({
  accepting: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case ACCEPT_TERMS_PENDING:
      return state.set('accepting', true);

    case ACCEPT_TERMS_FULFILLED:
    case ACCEPT_TERMS_REJECTED:
      return state.set('accepting', false);

    default:
      return state;
  }
}
