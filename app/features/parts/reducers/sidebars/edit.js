import {fromJS, Map} from 'immutable';
import {
  LOAD_PARTS_LIST_FULFILLED,
  SELECT_PART,
  CLEAR_SELECTED_PART,
  CLOSE_PARTS_LIST_EDIT_SIDEBAR,
  SET_EDIT_PART_FIELD_VALUE_MODEL_PROPERTY,
  SET_EDIT_PART_MODEL_PROPERTY,
  UPDATE_PART_PENDING,
  UPDATE_PART_FULFILLED,
  UPDATE_PART_REJECTED,
} from '../../actions';

const initialState = Map({
  show: false,
  saving: false,
  model: Map(),
  validationErrors: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_SELECTED_PART:
    case CLOSE_PARTS_LIST_EDIT_SIDEBAR:
    case LOAD_PARTS_LIST_FULFILLED:
    case UPDATE_PART_FULFILLED:
      return initialState;

    case SELECT_PART:
      return state.withMutations(map =>
        map.set('show', true)
          .set('saving', false)
          .set('model', action.payload)
          .set('validationErrors', Map()));

    case SET_EDIT_PART_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case SET_EDIT_PART_FIELD_VALUE_MODEL_PROPERTY: {
      const {id, value} = action.payload;
      const partFields = state.getIn(['model', 'partFieldValues']);
      const index = partFields.findIndex(y => y.get('partFieldId') === id);

      return state.updateIn(['model', 'partFieldValues'], partFieldValues => {
        if (index === -1) {
          if (value === null) return partFieldValues;

          return partFieldValues.push(fromJS({partFieldId: id, value}));
        }

        if (value === null || value === '') return partFieldValues.delete(index);

        return partFieldValues.set(index, fromJS({partFieldId: id, value}));
      });
    }

    case UPDATE_PART_PENDING:
      return state.set('saving', true);

    case UPDATE_PART_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
