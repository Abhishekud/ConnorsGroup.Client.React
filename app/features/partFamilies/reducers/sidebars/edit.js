import {fromJS, Map} from 'immutable';
import {
  LOAD_PART_FAMILIES_LIST_FULFILLED,
  SELECT_PART_FAMILY,
  CLEAR_SELECTED_PART_FAMILY,
  CLOSE_PART_FAMILIES_LIST_EDIT_SIDEBAR,
  SET_EDIT_PART_FAMILY_MODEL_PROPERTY,
  UPDATE_PART_FAMILY_PENDING,
  UPDATE_PART_FAMILY_FULFILLED,
  UPDATE_PART_FAMILY_REJECTED,
} from '../../actions';

const initialState = Map({
  show: false,
  saving: false,
  model: Map(),
  validationErrors: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_SELECTED_PART_FAMILY:
    case CLOSE_PART_FAMILIES_LIST_EDIT_SIDEBAR:
    case LOAD_PART_FAMILIES_LIST_FULFILLED:
    case UPDATE_PART_FAMILY_FULFILLED:
      return initialState;

    case SELECT_PART_FAMILY:
      return state.withMutations(map =>
        map.set('show', true)
          .set('saving', false)
          .set('model', action.payload)
          .set('validationErrors', Map()));

    case SET_EDIT_PART_FAMILY_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case UPDATE_PART_FAMILY_PENDING:
      return state.set('saving', true);

    case UPDATE_PART_FAMILY_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
