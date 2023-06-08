import {fromJS, Map} from 'immutable';
import {
  SHOW_DELETE_MODAL,
  CANCEL_DELETE,
  DELETE_KRONOS_ENDPOINT_FULFILLED,
  DELETE_KRONOS_ENDPOINT_PENDING,
  DELETE_KRONOS_ENDPOINT_REJECTED,
} from '../../actions';

const initialState = fromJS({
  show: false,
  model: new Map(),
  deleting: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_DELETE_MODAL:
      return state.set('show', true).set('model', action.payload);
    case CANCEL_DELETE:
    case DELETE_KRONOS_ENDPOINT_FULFILLED:
      return initialState;
    case DELETE_KRONOS_ENDPOINT_PENDING:
      return state.set('deleting', true);
    case DELETE_KRONOS_ENDPOINT_REJECTED:
      return state.set('deleting', false);
    default:
      return state;
  }
}
