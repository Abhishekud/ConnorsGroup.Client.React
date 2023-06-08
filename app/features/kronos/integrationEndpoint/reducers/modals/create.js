import {fromJS, Map} from 'immutable';
import {
  SHOW_CREATE_MODAL,
  HIDE_CREATE_MODAL,
  SET_PROPERTY_FOR_CREATE,
  CREATE_KRONOS_ENDPOINT_FULFILLED,
  CREATE_KRONOS_ENDPOINT_PENDING,
  CREATE_KRONOS_ENDPOINT_REJECTED,

  CREATE_KRONOS_WFD_ENDPOINT_FULFILLED,
  CREATE_KRONOS_WFD_ENDPOINT_PENDING,
  CREATE_KRONOS_WFD_ENDPOINT_REJECTED,
} from '../../actions';

const initialState = fromJS({
  show: false,
  saving: false,
  model: new Map(),
  validationErrors: new Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_MODAL:
      return state.set('show', true).set('model', new Map({id: action.payload}));
    case HIDE_CREATE_MODAL:
      return initialState;
    case CREATE_KRONOS_ENDPOINT_PENDING:
    case CREATE_KRONOS_WFD_ENDPOINT_PENDING:
      return state.withMutations(map =>
        map.set('saving', true)
          .set('validationErrors', new Map())
      );
    case CREATE_KRONOS_ENDPOINT_REJECTED:
    case CREATE_KRONOS_WFD_ENDPOINT_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });
    case CREATE_KRONOS_ENDPOINT_FULFILLED:
    case CREATE_KRONOS_WFD_ENDPOINT_FULFILLED:
      return initialState;
    case SET_PROPERTY_FOR_CREATE: {
      return state.setIn(['model', action.payload.id], action.payload.value);
    }
  }
  return state;
}
