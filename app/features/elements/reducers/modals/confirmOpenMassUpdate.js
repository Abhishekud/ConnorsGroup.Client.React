import {Map} from 'immutable';
import {
  HIDE_CONFIRM_OPEN_MASS_UPDATE,
  SHOW_CONFIRM_OPEN_MASS_UPDATE,
} from '../../actions';

const initialState = new Map({
  show: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CONFIRM_OPEN_MASS_UPDATE:
      return state.set('show', true);

    case HIDE_CONFIRM_OPEN_MASS_UPDATE:
      return initialState;

    default:
      return state;
  }
}
