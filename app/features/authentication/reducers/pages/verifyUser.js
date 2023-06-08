import {Map} from 'immutable';
import {SET_RETURN_PATH} from '../../actions';

const initialState = new Map({
  returnPath: '',
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_RETURN_PATH:
      return state.set('returnPath', action.payload);

    default:
      return state;
  }
}
