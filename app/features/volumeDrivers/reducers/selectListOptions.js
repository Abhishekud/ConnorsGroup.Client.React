import {Map, List, fromJS} from 'immutable';
import {
  LOAD_VOLUME_DRIVER_SELECT_LIST_OPTIONS_FULFILLED,
} from '../actions';

const initialState = Map({
  volumeDrivers: List(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_VOLUME_DRIVER_SELECT_LIST_OPTIONS_FULFILLED:
      return state.set('volumeDrivers', fromJS(action.payload.data));

    default:
      return state;
  }
}
