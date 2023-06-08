import {fromJS} from 'immutable';
import {
  SET_PROPERTY_FOR_EDIT,
  CANCEL_EDIT,
  SELECT_JOB,
  DELETE,

  SAVE_EDIT_FULFILLED,
  SAVE_EDIT_PENDING,
  SAVE_EDIT_REJECTED,
} from '../../actions';

const initialState = fromJS({
  show: false,
  saving: false,
  model: {},
  dirty: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_JOB:
      return state.set('model', action.payload).set('show', true).set('dirty', false);
    case CANCEL_EDIT:
    case DELETE:
      return initialState;

    case SAVE_EDIT_FULFILLED:
      return initialState;
    case SAVE_EDIT_PENDING:
      return state.set('saving', true);
    case SAVE_EDIT_REJECTED:
      return state.set('saving', false);

    case SET_PROPERTY_FOR_EDIT:
      return state.setIn(['model', action.payload.id], action.payload.value).set('dirty', true);
  }
  return state;
}

