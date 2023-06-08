import {fromJS, Map} from 'immutable';
import {
  LOAD_PART_FIELDS_LIST_FULFILLED,
  SELECT_PART_FIELD,
  CLEAR_SELECTED_PART_FIELD,
  CLOSE_EDIT_PART_FIELD_SIDEBAR,
  SET_EDIT_PART_FIELD_MODEL_PROPERTY,
  UPDATE_PART_FIELD_PENDING,
  UPDATE_PART_FIELD_FULFILLED,
  UPDATE_PART_FIELD_REJECTED,
} from '../../actions';

const initialState = Map({
  show: false,
  editing: false,
  saving: false,
  model: Map(),
  validationErrors: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_SELECTED_PART_FIELD:
    case CLOSE_EDIT_PART_FIELD_SIDEBAR:
    case LOAD_PART_FIELDS_LIST_FULFILLED:
    case UPDATE_PART_FIELD_FULFILLED:
      return initialState;

    case SELECT_PART_FIELD:
      return state.withMutations(map =>
        map.set('show', true)
          .set('saving', false)
          .set('model', action.payload)
          .set('validationErrors', Map()));

    case SET_EDIT_PART_FIELD_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case UPDATE_PART_FIELD_PENDING:
      return state.set('saving', true);

    case UPDATE_PART_FIELD_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
