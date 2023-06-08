import {Map} from 'immutable';
import {
  LOAD_CHARACTERISTICS_LIST_PENDING,
  LOAD_CHARACTERISTICS_LIST_REJECTED,
  TOGGLE_CHARACTERISTICS_LIST_FILTERS_SIDEBAR,
  SET_CHARACTERISTICS_LIST_FILTERS_MODEL_PROPERTY,
  CLEAR_CHARACTERISTICS_SIDEBAR_FILTERS,
} from '../../actions';

const initialState = Map({
  applying: false,
  show: false,
  model: Map({
    status: '',
  }),
  appliedCount: 0,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CHARACTERISTICS_LIST_FILTERS_SIDEBAR:
      return state.set('show', !state.get('show'));

    case LOAD_CHARACTERISTICS_LIST_PENDING:
      return state.set('applying', true);

    case LOAD_CHARACTERISTICS_LIST_REJECTED:
      return state.set('applying', false);

    case SET_CHARACTERISTICS_LIST_FILTERS_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case CLEAR_CHARACTERISTICS_SIDEBAR_FILTERS:
      return state.set('model');

    default:
      return state;
  }
}
