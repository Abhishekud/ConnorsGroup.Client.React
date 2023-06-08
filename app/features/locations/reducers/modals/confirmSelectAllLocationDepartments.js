import {Map} from 'immutable';
import {
  TOGGLE_CONFIRM_SELECT_ALL_LOCATION_DEPARTMENTS,
} from '../../actions';

const initialState = new Map({
  show: false,
  model: new Map({
    columnId: null,
    columnName: null,
    appliedCheck: false,
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CONFIRM_SELECT_ALL_LOCATION_DEPARTMENTS: {
      if (!state.get('show')) {
        return initialState.withMutations(map =>
          map.set('show', true)
            .set('model', action.payload));
      }
      return initialState;
    }

    default:
      return state;
  }
}
