import {Map} from 'immutable';
import {
  LOAD_BRAND_FULFILLED,
  LOAD_BRAND_REJECTED,
} from '../../actions';
import {
  SAVE_BACKGROUND_COLOR_FULFILLED,
} from '../../../adminTools/actions';

const initialState = new Map({
  groups: new Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SAVE_BACKGROUND_COLOR_FULFILLED:
    case LOAD_BRAND_FULFILLED: {
      const {color} = action.payload.data;
      return state.withMutations(map =>
        map.set('color', color));
    }

    case LOAD_BRAND_REJECTED: {
      return state.withMutations(map =>
        map.set('color', '#d5d5d5'));
    }

    default:
      return state;
  }
}
