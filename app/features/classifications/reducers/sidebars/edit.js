import {fromJS, Map} from 'immutable';
import {
  LOAD_CLASSIFICATIONS_LIST_FULFILLED,
  SELECT_CLASSIFICATION,
  CLEAR_SELECTED_CLASSIFICATION,
  CLOSE_CLASSIFICATIONS_LIST_EDIT_SIDEBAR,
  SET_EDIT_CLASSIFICATION_MODEL_PROPERTY,
  UPDATE_CLASSIFICATION_PENDING,
  UPDATE_CLASSIFICATION_FULFILLED,
  UPDATE_CLASSIFICATION_REJECTED,
} from '../../actions';

const initialState = Map({
  show: false,
  editing: false,
  saving: false,
  model: Map(),
  validationErrors: Map(),
  dirty: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_SELECTED_CLASSIFICATION:
    case CLOSE_CLASSIFICATIONS_LIST_EDIT_SIDEBAR:
    case LOAD_CLASSIFICATIONS_LIST_FULFILLED:
    case UPDATE_CLASSIFICATION_FULFILLED:
      return initialState;

    case SELECT_CLASSIFICATION:
      return state.withMutations(map =>
        map.set('show', true)
          .set('saving', false)
          .set('model', action.payload)
          .set('validationErrors', Map()));

    case SET_EDIT_CLASSIFICATION_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value).set('dirty', true);
    }

    case UPDATE_CLASSIFICATION_PENDING:
      return state.set('saving', true);

    case UPDATE_CLASSIFICATION_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
