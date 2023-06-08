import {Map} from 'immutable';
import {
  LOAD_VOLUME_DRIVER_MAPPINGS_LIST_PENDING,
  LOAD_VOLUME_DRIVER_MAPPINGS_LIST_FULFILLED,
  LOAD_VOLUME_DRIVER_MAPPINGS_LIST_REJECTED,
  TOGGLE_VOLUME_DRIVER_MAPPINGS_LIST_FILTERS_SIDEBAR,
  SET_VOLUME_DRIVER_MAPPINGS_LIST_FILTERS_MODEL_PROPERTY,
  CLEAR_VOLUME_DRIVER_MAPPINGS_LIST_FILTERS,
} from '../../actions';

const initialState = Map({
  applying: false,
  show: false,
  model: Map(),
  appliedCount: 0,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_VOLUME_DRIVER_MAPPINGS_LIST_FILTERS_SIDEBAR:
      return state.set('show', !state.get('show'));

    case LOAD_VOLUME_DRIVER_MAPPINGS_LIST_PENDING:
      return state.set('applying', true);

    case LOAD_VOLUME_DRIVER_MAPPINGS_LIST_FULFILLED: {
      const appliedFilterCount = state.get('model').filter(value => value).size;
      return state.withMutations(map =>
        map.set('applying', false)
          .set('appliedCount', appliedFilterCount));
    }

    case LOAD_VOLUME_DRIVER_MAPPINGS_LIST_REJECTED:
      return state.set('applying', false);

    case SET_VOLUME_DRIVER_MAPPINGS_LIST_FILTERS_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case CLEAR_VOLUME_DRIVER_MAPPINGS_LIST_FILTERS:
      return state.set('model', Map());

    default:
      return state;
  }
}
