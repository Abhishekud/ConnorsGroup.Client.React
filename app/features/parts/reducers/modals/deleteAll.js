import {Map} from 'immutable';
import {
  SHOW_DELETE_ALL_PARTS,
  CANCEL_DELETE_ALL_PARTS,
  SHOW_DELETE_ALL_PARTS_CONFIRM,
} from '../../actions';

const initialState = new Map({
  show: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_DELETE_ALL_PARTS:
      return state.set('show', true);

    case CANCEL_DELETE_ALL_PARTS:
    case SHOW_DELETE_ALL_PARTS_CONFIRM:
      return initialState;

    default:
      return state;
  }
}
