import {Map} from 'immutable';
import {
  TOGGLE_NAVIGATION_SIDEBAR,
} from '../../actions';

const initialState = Map({
  show: true,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_NAVIGATION_SIDEBAR:
      return state.set('show', !state.get('show'));

    default:
      return state;
  }
}
