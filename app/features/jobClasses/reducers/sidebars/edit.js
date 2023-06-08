import {fromJS, Map} from 'immutable';
import {
  LOAD_JOB_CLASSES_LIST_FULFILLED,
  SELECT_JOB_CLASS,
  CLEAR_SELECTED_JOB_CLASS,
  CLOSE_JOB_CLASSES_LIST_EDIT_SIDEBAR,
  SET_EDIT_JOB_CLASS_MODEL_PROPERTY,
  UPDATE_JOB_CLASS_PENDING,
  UPDATE_JOB_CLASS_FULFILLED,
  UPDATE_JOB_CLASS_REJECTED,
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
    case CLEAR_SELECTED_JOB_CLASS:
    case CLOSE_JOB_CLASSES_LIST_EDIT_SIDEBAR:
    case LOAD_JOB_CLASSES_LIST_FULFILLED:
    case UPDATE_JOB_CLASS_FULFILLED:
      return initialState;

    case SELECT_JOB_CLASS:
      return state.withMutations(map =>
        map.set('show', true)
          .set('saving', false)
          .set('model', action.payload)
          .set('dirty', false)
          .set('validationErrors', Map()));

    case SET_EDIT_JOB_CLASS_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value).set('dirty', true);
    }

    case UPDATE_JOB_CLASS_PENDING:
      return state.set('saving', true);

    case UPDATE_JOB_CLASS_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
