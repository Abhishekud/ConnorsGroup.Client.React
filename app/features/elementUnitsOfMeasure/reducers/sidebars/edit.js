import {fromJS, Map} from 'immutable';
import {
  LOAD_ELEMENT_UNITS_OF_MEASURE_LIST_FULFILLED,
  SELECT_ELEMENT_UNIT_OF_MEASURE,
  CLEAR_SELECTED_ELEMENT_UNIT_OF_MEASURE,
  CLOSE_ELEMENT_UNITS_OF_MEASURE_LIST_EDIT_SIDEBAR,
  SET_EDIT_ELEMENT_UNIT_OF_MEASURE_MODEL_PROPERTY,
  UPDATE_ELEMENT_UNIT_OF_MEASURE_PENDING,
  UPDATE_ELEMENT_UNIT_OF_MEASURE_FULFILLED,
  UPDATE_ELEMENT_UNIT_OF_MEASURE_REJECTED,
} from '../../actions';

const initialState = Map({
  show: false,
  saving: false,
  model: Map(),
  validationErrors: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_SELECTED_ELEMENT_UNIT_OF_MEASURE:
    case CLOSE_ELEMENT_UNITS_OF_MEASURE_LIST_EDIT_SIDEBAR:
    case LOAD_ELEMENT_UNITS_OF_MEASURE_LIST_FULFILLED:
    case UPDATE_ELEMENT_UNIT_OF_MEASURE_FULFILLED:
      return initialState;

    case SELECT_ELEMENT_UNIT_OF_MEASURE:
      return state.withMutations(map =>
        map.set('show', true)
          .set('saving', false)
          .set('model', action.payload)
          .set('validationErrors', Map()));

    case SET_EDIT_ELEMENT_UNIT_OF_MEASURE_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case UPDATE_ELEMENT_UNIT_OF_MEASURE_PENDING:
      return state.set('saving', true);

    case UPDATE_ELEMENT_UNIT_OF_MEASURE_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
