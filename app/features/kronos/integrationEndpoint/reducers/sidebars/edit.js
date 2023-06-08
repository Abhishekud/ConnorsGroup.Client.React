import {fromJS, Map} from 'immutable';
import {
  SET_PROPERTY_FOR_EDIT,
  UPDATE_KRONOS_ENDPOINT_FULFILLED,
  UPDATE_KRONOS_ENDPOINT_PENDING,
  UPDATE_KRONOS_ENDPOINT_REJECTED,
  CANCEL_EDIT,
  SELECT_ENDPOINT,
  DELETE_KRONOS_ENDPOINT_PENDING,
  DELETE_KRONOS_ENDPOINT_REJECTED,
  DELETE_KRONOS_ENDPOINT_FULFILLED,
  CREATE_KRONOS_ENDPOINT_FULFILLED,
  CREATE_KRONOS_WFD_ENDPOINT_FULFILLED,
  UPDATE_KRONOS_WFD_ENDPOINT_FULFILLED,
  UPDATE_KRONOS_WFD_ENDPOINT_PENDING,
  UPDATE_KRONOS_WFD_ENDPOINT_REJECTED,
} from '../../actions';

const initialState = fromJS({
  show: false,
  saving: false,
  model: new Map({
    updateWfdAppKey: false,
    updatePassword: false,
    updateWfdClientId: false,
    updateWfdClientSecret: false,
  }),
  dirty: false,
  validationErrors: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_ENDPOINT: {
      return state.set('model', action.payload).set('show', true).set('dirty', false);
    }
    case CREATE_KRONOS_ENDPOINT_FULFILLED:
    case CREATE_KRONOS_WFD_ENDPOINT_FULFILLED:
      return state.withMutations(map =>
        map.set('model', fromJS(action.payload.data))
          .set('show', true)
          .set('dirty', false)
      );
    case CANCEL_EDIT:
    case DELETE_KRONOS_ENDPOINT_FULFILLED:
      return initialState;
    case UPDATE_KRONOS_ENDPOINT_PENDING:
    case UPDATE_KRONOS_WFD_ENDPOINT_PENDING:
    case DELETE_KRONOS_ENDPOINT_PENDING:
      return state.withMutations(map => {
        map.set('saving', true)
          .set('validationErrors', Map());
      });
    case UPDATE_KRONOS_ENDPOINT_REJECTED:
    case UPDATE_KRONOS_WFD_ENDPOINT_REJECTED:
    case DELETE_KRONOS_ENDPOINT_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });
    case UPDATE_KRONOS_ENDPOINT_FULFILLED:
    case UPDATE_KRONOS_WFD_ENDPOINT_FULFILLED:
      return initialState;
    case SET_PROPERTY_FOR_EDIT:
      return state.setIn(['model', action.payload.id], action.payload.value).set('dirty', true);
  }
  return state;
}
