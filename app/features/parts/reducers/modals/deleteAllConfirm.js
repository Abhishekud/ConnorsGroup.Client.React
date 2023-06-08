import {Map, fromJS} from 'immutable';
import {
  CANCEL_DELETE_ALL_PARTS,
  SHOW_DELETE_ALL_PARTS_CONFIRM,
  DELETE_ALL_PARTS_FULFILLED,
  DELETE_ALL_PARTS_PENDING,
  DELETE_ALL_PARTS_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  deleting: false,
  validationErrors: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_DELETE_ALL_PARTS_CONFIRM:
      return state.set('show', true);

    case DELETE_ALL_PARTS_PENDING:
      return state.set('deleting', true);

    case CANCEL_DELETE_ALL_PARTS:
    case DELETE_ALL_PARTS_FULFILLED:
      return initialState;

    case DELETE_ALL_PARTS_REJECTED:
      return state.withMutations(map => {
        map.set('deleting', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
