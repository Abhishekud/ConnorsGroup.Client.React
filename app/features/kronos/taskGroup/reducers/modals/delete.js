import {fromJS, Map} from 'immutable';
import {
  SHOW_DELETE_MODAL,
  CANCEL_DELETE,
  DELETE_FULFILLED,
  DELETE_PENDING,
  DELETE_REJECTED,
} from '../../actions';

const initialState = fromJS({
  show: false,
  model: {},
  validationErrors: {},
  deleting: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_DELETE_MODAL:
      return state.set('show', true).set('model', action.payload);
    case CANCEL_DELETE:
    case DELETE_FULFILLED:
      return initialState;

    case DELETE_PENDING:
      return state.set('deleting', true);

    case DELETE_REJECTED:
      return state.withMutations(map => {
        map.set('deleting', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });
    default:
      return state;
  }
}

