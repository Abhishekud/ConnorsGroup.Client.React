import {Map, List, fromJS} from 'immutable';
import {
  LOAD_CHARACTERISTIC_SETS_SELECT_LIST_OPTIONS_FULFILLED,
} from '../actions';

const initialState = Map({
  characteristicSet: List(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_CHARACTERISTIC_SETS_SELECT_LIST_OPTIONS_FULFILLED:
      return state.set('characteristicSet', fromJS(action.payload.data));

    default:
      return state;
  }
}
