import {Map} from 'immutable';
import {
  ADD_ELEMENTS_PENDING,
  ADD_ELEMENTS_FULFILLED,
  ADD_ELEMENTS_REJECTED,
  OPEN_ELEMENT_SEARCH,
} from '../../actions';
import {
  LOAD_ELEMENTS_LIST_PENDING,
  LOAD_ELEMENTS_LIST_FULFILLED,
  LOAD_ELEMENTS_LIST_REJECTED,
} from '../../../elements/actions';

const initialState = new Map({
  loading: false,
  addLocation: new Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case OPEN_ELEMENT_SEARCH:
      return state.set('addLocation', new Map(action.payload));

    case LOAD_ELEMENTS_LIST_PENDING:
    case ADD_ELEMENTS_PENDING:
      return state.set('loading', true);

    case LOAD_ELEMENTS_LIST_FULFILLED:
      return state.set('loading', false);

    case ADD_ELEMENTS_FULFILLED:
    case ADD_ELEMENTS_REJECTED:
      return state.set('loading', false);

    case LOAD_ELEMENTS_LIST_REJECTED:
      return initialState;

    default:
      return state;
  }
}
