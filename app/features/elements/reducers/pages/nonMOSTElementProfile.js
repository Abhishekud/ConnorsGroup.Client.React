import {Map} from 'immutable';
import {
  LOAD_NON_MOST_ELEMENT_PENDING,
  LOAD_NON_MOST_ELEMENT_FULFILLED,
  LOAD_NON_MOST_ELEMENT_REJECTED,
} from '../../actions';

const initialState = Map({
  loading: false,
  standardsCount: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_NON_MOST_ELEMENT_PENDING:
      return initialState.set('loading', true);

    case LOAD_NON_MOST_ELEMENT_FULFILLED: {
      const {standardsCount} = action.payload.data;

      return state.withMutations(map =>
        map.set('loading', false)
          .set('standardsCount', standardsCount));
    }

    case LOAD_NON_MOST_ELEMENT_REJECTED:
      return state.set('loading', false);

    default:
      return state;
  }
}
