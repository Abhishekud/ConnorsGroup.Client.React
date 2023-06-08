import {Map, List, fromJS} from 'immutable';
import {
  LOAD_ATTRIBUTE_SELECT_LIST_OPTIONS_FULFILLED,
  LOAD_INDUSTRY_ATTRIBUTE_SELECT_LIST_OPTIONS_FULFILLED,
} from '../actions';

const initialState = Map({
  attributes: List(),
  industryAttributes: List(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ATTRIBUTE_SELECT_LIST_OPTIONS_FULFILLED:
      return state.set('attributes', fromJS(action.payload.data));

    case LOAD_INDUSTRY_ATTRIBUTE_SELECT_LIST_OPTIONS_FULFILLED:
      return state.set('industryAttributes', fromJS(action.payload.data));

    default:
      return state;
  }
}
