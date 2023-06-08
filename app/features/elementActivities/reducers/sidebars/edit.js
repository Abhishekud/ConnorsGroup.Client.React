import {fromJS, Map} from 'immutable';
import {
  LOAD_ELEMENT_ACTIVITIES_LIST_FULFILLED,
  SELECT_ELEMENT_ACTIVITY,
  CLEAR_SELECTED_ELEMENT_ACTIVITY,
  CLOSE_ELEMENT_ACTIVITIES_LIST_EDIT_SIDEBAR,
  SET_EDIT_ELEMENT_ACTIVITY_MODEL_PROPERTY,
  UPDATE_ELEMENT_ACTIVITY_PENDING,
  UPDATE_ELEMENT_ACTIVITY_FULFILLED,
  UPDATE_ELEMENT_ACTIVITY_REJECTED,
} from '../../actions';

const initialState = Map({
  show: false,
  saving: false,
  model: Map(),
  validationErrors: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_SELECTED_ELEMENT_ACTIVITY:
    case CLOSE_ELEMENT_ACTIVITIES_LIST_EDIT_SIDEBAR:
    case LOAD_ELEMENT_ACTIVITIES_LIST_FULFILLED:
    case UPDATE_ELEMENT_ACTIVITY_FULFILLED:
      return initialState;

    case SELECT_ELEMENT_ACTIVITY:
      return state.withMutations(map =>
        map.set('show', true)
          .set('saving', false)
          .set('model', action.payload)
          .set('validationErrors', Map()));

    case SET_EDIT_ELEMENT_ACTIVITY_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case UPDATE_ELEMENT_ACTIVITY_PENDING:
      return state.set('saving', true);

    case UPDATE_ELEMENT_ACTIVITY_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
