import {Map} from 'immutable';
import {
  INDUSTRY_ELEMENTS_LOAD_MOST_ELEMENT_DETAILS_PENDING,
  INDUSTRY_ELEMENTS_LOAD_MOST_ELEMENT_DETAILS_FULFILLED,
  INDUSTRY_ELEMENTS_LOAD_MOST_ELEMENT_DETAILS_REJECTED,
} from '../../actions';

const initialState = Map({
  loading: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case INDUSTRY_ELEMENTS_LOAD_MOST_ELEMENT_DETAILS_PENDING:
      return initialState.set('loading', true);

    case INDUSTRY_ELEMENTS_LOAD_MOST_ELEMENT_DETAILS_FULFILLED: {
      return state.withMutations(map =>
        map.set('loading', false));
    }

    case INDUSTRY_ELEMENTS_LOAD_MOST_ELEMENT_DETAILS_REJECTED:
      return state.set('loading', false);

    default:
      return state;
  }
}
