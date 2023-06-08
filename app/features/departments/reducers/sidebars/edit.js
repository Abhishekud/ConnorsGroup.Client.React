import {fromJS, Map} from 'immutable';
import {
  LOAD_DEPARTMENTS_LIST_FULFILLED,
  SELECT_DEPARTMENT,
  CLEAR_SELECTED_DEPARTMENT,
  CLOSE_DEPARTMENTS_LIST_EDIT_SIDEBAR,
  SET_EDIT_DEPARTMENT_MODEL_PROPERTY,
  UPDATE_DEPARTMENT_PENDING,
  UPDATE_DEPARTMENT_FULFILLED,
  UPDATE_DEPARTMENT_REJECTED,
} from '../../actions';

const initialState = Map({
  show: false,
  saving: false,
  dirty: false,
  model: Map(),
  validationErrors: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_SELECTED_DEPARTMENT:
    case CLOSE_DEPARTMENTS_LIST_EDIT_SIDEBAR:
    case LOAD_DEPARTMENTS_LIST_FULFILLED:
    case UPDATE_DEPARTMENT_FULFILLED:
      return initialState;

    case SELECT_DEPARTMENT:
      return state.withMutations(map =>
        map.set('show', true)
          .set('saving', false)
          .set('dirty', false)
          .set('model', action.payload)
          .set('validationErrors', Map()));

    case SET_EDIT_DEPARTMENT_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value).set('dirty', true);
    }

    case UPDATE_DEPARTMENT_PENDING:
      return state.set('saving', true);

    case UPDATE_DEPARTMENT_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
