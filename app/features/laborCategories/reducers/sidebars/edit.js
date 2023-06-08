import {fromJS, Map} from 'immutable';
import {
  LOAD_LABOR_CATEGORIES_LIST_FULFILLED,
  SELECT_LABOR_CATEGORY,
  CLEAR_SELECTED_LABOR_CATEGORY,
  CLOSE_LABOR_CATEGORIES_LIST_EDIT_SIDEBAR,
  SET_EDIT_LABOR_CATEGORY_MODEL_PROPERTY,
  UPDATE_LABOR_CATEGORY_PENDING,
  UPDATE_LABOR_CATEGORY_FULFILLED,
  UPDATE_LABOR_CATEGORY_REJECTED,
} from '../../actions';

const initialState = Map({
  show: false,
  saving: false,
  model: Map(),
  dirty: false,
  validationErrors: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_SELECTED_LABOR_CATEGORY:
    case CLOSE_LABOR_CATEGORIES_LIST_EDIT_SIDEBAR:
    case LOAD_LABOR_CATEGORIES_LIST_FULFILLED:
    case UPDATE_LABOR_CATEGORY_FULFILLED:
      return initialState;

    case SELECT_LABOR_CATEGORY:
      return state.withMutations(map =>
        map.set('show', true)
          .set('saving', false)
          .set('model', action.payload)
          .set('dirty', false)
          .set('validationErrors', Map()));

    case SET_EDIT_LABOR_CATEGORY_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value).set('dirty', true);
    }

    case UPDATE_LABOR_CATEGORY_PENDING:
      return state.set('saving', true);

    case UPDATE_LABOR_CATEGORY_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
