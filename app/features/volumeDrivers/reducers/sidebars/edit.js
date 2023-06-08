import {fromJS, Map} from 'immutable';
import {
  LOAD_VOLUME_DRIVERS_LIST_FULFILLED,
  SELECT_VOLUME_DRIVER,
  CLEAR_SELECTED_VOLUME_DRIVER,
  CLOSE_VOLUME_DRIVERS_LIST_EDIT_SIDEBAR,
  SET_EDIT_VOLUME_DRIVER_MODEL_PROPERTY,
  UPDATE_VOLUME_DRIVER_PENDING,
  UPDATE_VOLUME_DRIVER_FULFILLED,
  UPDATE_VOLUME_DRIVER_REJECTED,
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
    case CLEAR_SELECTED_VOLUME_DRIVER:
    case CLOSE_VOLUME_DRIVERS_LIST_EDIT_SIDEBAR:
    case LOAD_VOLUME_DRIVERS_LIST_FULFILLED:
    case UPDATE_VOLUME_DRIVER_FULFILLED:
      return initialState;

    case SELECT_VOLUME_DRIVER:
      return state.withMutations(map =>
        map.set('show', true)
          .set('saving', false)
          .set('dirty', false)
          .set('model', action.payload)
          .set('validationErrors', Map()));

    case SET_EDIT_VOLUME_DRIVER_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value).set('dirty', true);
    }

    case UPDATE_VOLUME_DRIVER_PENDING:
      return state.set('saving', true);

    case UPDATE_VOLUME_DRIVER_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
