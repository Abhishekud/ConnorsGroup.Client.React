import {Map} from 'immutable';
import {CLIPBOARD_COPY_ITEMS, CLIPBOARD_CLEAR_COPIED_ITEMS} from '../../actions';

const initialState = new Map({
  copiedItems: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CLIPBOARD_COPY_ITEMS: {
      return state.withMutations(map =>
        map.set('copiedItems', action.payload.copiedItems));
    }

    case CLIPBOARD_CLEAR_COPIED_ITEMS: {
      return initialState;
    }

    default:
      return state;
  }
}
