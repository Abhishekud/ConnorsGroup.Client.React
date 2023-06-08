import {fromJS, Map} from 'immutable';
import {
  LOAD_UNITS_OF_MEASURE_LIST_FULFILLED,
  SELECT_UNIT_OF_MEASURE,
  CLEAR_SELECTED_UNIT_OF_MEASURE,
  CLOSE_UNITS_OF_MEASURE_LIST_EDIT_SIDEBAR,
  SET_EDIT_UNIT_OF_MEASURE_MODEL_PROPERTY,
  UPDATE_UNIT_OF_MEASURE_PENDING,
  UPDATE_UNIT_OF_MEASURE_FULFILLED,
  UPDATE_UNIT_OF_MEASURE_REJECTED,
} from '../../actions';

const initialState = Map({
  show: false,
  editing: false,
  saving: false,
  dirty: false,
  pristineModel: Map(),
  workingModel: Map(),
  validationErrors: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_SELECTED_UNIT_OF_MEASURE:
    case CLOSE_UNITS_OF_MEASURE_LIST_EDIT_SIDEBAR:
    case LOAD_UNITS_OF_MEASURE_LIST_FULFILLED:
    case UPDATE_UNIT_OF_MEASURE_FULFILLED:
      return initialState;

    case SELECT_UNIT_OF_MEASURE:
      return state.withMutations(map =>
        map.set('show', true)
          .set('saving', false)
          .set('dirty', false)
          .set('model', action.payload)
          .set('validationErrors', Map()));

    case SET_EDIT_UNIT_OF_MEASURE_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value).set('dirty', true);
    }

    case UPDATE_UNIT_OF_MEASURE_PENDING:
      return state.set('saving', true);

    case UPDATE_UNIT_OF_MEASURE_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
