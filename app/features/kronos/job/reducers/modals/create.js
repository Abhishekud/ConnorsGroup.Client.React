import {fromJS, Map} from 'immutable';
import {
  SHOW_CREATE_MODAL,
  HIDE_CREATE_MODAL,
  SET_PROPERTY_FOR_CREATE,
  CREATE,
  CREATE_FULFILLED,
  CREATE_PENDING,
  CREATE_REJECTED,
} from '../../actions';

const initialState = fromJS({
  show: false,
  saving: false,
  model: new Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_MODAL:
      return state.set('show', true).set('model', new Map({id: action.payload}));
    case HIDE_CREATE_MODAL:
      return initialState;
    case CREATE_PENDING:
      return state.set('saving', true);
    case CREATE:
    case CREATE_FULFILLED:
      return state.set('show', false).set('saving', false).set('model', new Map());
    case CREATE_REJECTED:
      return state.set('saving', false);
    case SET_PROPERTY_FOR_CREATE: {
      return state.setIn(['model', action.payload.id], action.payload.value);
    }
  }
  return state;
}
