import {fromJS, Map} from 'immutable';
import {
  LOAD_SELECT_LISTS_OPTIONS_FULFILLED,
  LOAD_SELECT_LIST_OPTIONS_FULFILLED,
} from '../../actions';

const initialState = new Map();

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_SELECT_LIST_OPTIONS_FULFILLED: {
      const {data} = action.payload;
      return state.set(data.type, fromJS(data.options));
    }

    case LOAD_SELECT_LISTS_OPTIONS_FULFILLED: {
      const {data} = action.payload;
      return state.withMutations(map => {
        for (const result of data) {
          map.set(result.type, fromJS(result.options));
        }
      });
    }

    default:
      return state;
  }
}
