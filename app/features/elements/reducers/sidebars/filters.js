import {Map} from 'immutable';
import {
  LOAD_ELEMENTS_LIST_PENDING,
  LOAD_ELEMENTS_LIST_FULFILLED,
  LOAD_ELEMENTS_LIST_REJECTED,
  SET_ELEMENTS_LIST_FILTERS_MODEL_PROPERTY,
  CLEAR_ELEMENTS_LIST_FILTERS,
} from '../../actions';

const initialState = Map({
  applying: false,
  show: false,
  model: Map(),
  pristine: Map(),
  appliedCount: 0,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ELEMENTS_LIST_PENDING:
      return state.withMutations(map =>
        map.set('applying', true)
          .set('pristine', map.get('model')));

    case LOAD_ELEMENTS_LIST_FULFILLED: {
      const appliedFilterCount = state.get('model').filter(value => value).size;
      return state.withMutations(map =>
        map.set('applying', false)
          .set('appliedCount', appliedFilterCount));
    }

    case LOAD_ELEMENTS_LIST_REJECTED:
      return state.set('applying', false);

    case SET_ELEMENTS_LIST_FILTERS_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case CLEAR_ELEMENTS_LIST_FILTERS:
      return state.withMutations(map =>
        map.set('model', Map())
          .set('pristine', Map()));

    default:
      return state;
  }
}
