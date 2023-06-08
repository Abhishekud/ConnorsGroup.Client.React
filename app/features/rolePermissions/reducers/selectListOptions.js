import {Map, List, fromJS} from 'immutable';
import {LOAD_ROLE_SELECT_LIST_OPTIONS_FULFILLED} from '../actions';

const initialState = Map({
  roles: List(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ROLE_SELECT_LIST_OPTIONS_FULFILLED:
      return state.set('roles', fromJS(action.payload.data));

    default:
      return state;
  }
}
