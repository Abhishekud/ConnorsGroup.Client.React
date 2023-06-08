import {Map, List, fromJS} from 'immutable';
import {
  LOAD_VOLUME_DRIVER_MAPPING_SETS_SELECT_LIST_OPTIONS_FULFILLED,
} from '../actions';

const initialState = Map({
  volumeDriverMappingSets: List(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_VOLUME_DRIVER_MAPPING_SETS_SELECT_LIST_OPTIONS_FULFILLED:
      return state.set('volumeDriverMappingSets', fromJS(action.payload.data));

    default:
      return state;
  }
}
