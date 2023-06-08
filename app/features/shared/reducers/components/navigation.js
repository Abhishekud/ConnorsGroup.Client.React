import {Map} from 'immutable';
import {
  COLLAPSE_NAVIGATION_GROUP,
  EXPAND_NAVIGATION_GROUP,
  COLLAPSE_NAVIGATION_TREE,
} from '../../actions';

const initialState = new Map({
  groups: new Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case EXPAND_NAVIGATION_GROUP:
      return state.setIn(['groups', action.payload.group, 'expanded'], true);

    case COLLAPSE_NAVIGATION_GROUP:
      return state.setIn(['groups', action.payload.group, 'expanded'], false);

    case COLLAPSE_NAVIGATION_TREE:
      return initialState;

    default:
      return state;
  }
}
