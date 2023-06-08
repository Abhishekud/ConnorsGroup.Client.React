import {Map, List, fromJS} from 'immutable';
import {
  LOAD_UNIT_OF_MEASURE_SELECT_LIST_OPTIONS_FULFILLED,
} from '../actions';

const initialState = Map({
  unitsOfMeasure: List(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_UNIT_OF_MEASURE_SELECT_LIST_OPTIONS_FULFILLED:
      return state.set('unitsOfMeasure', fromJS(action.payload.data));

    default:
      return state;
  }
}
