import {fromJS} from 'immutable';
import {
  SET_EDIT_ATTRIBUTE_PROPERTY,
  OPEN_ATTRIBUTE_SIDEBAR,
  CLOSE_ATTRIBUTE_SIDEBAR,
  UPDATE_REFLEXIS_ATTRIBUTE_PENDING,
  UPDATE_REFLEXIS_ATTRIBUTE_REJECTED,
  UPDATE_REFLEXIS_ATTRIBUTE_FULFILLED,
  DELETE_REFLEXIS_ATTRIBUTE_PENDING,
  DELETE_REFLEXIS_ATTRIBUTE_REJECTED,
  DELETE_REFLEXIS_ATTRIBUTE_FULFILLED,
} from '../../actions';

const initialState = fromJS({
  show: false,
  saving: false,
  dirty: false,
  model: {
    name: '',
  },
  validationErrors: {},
  genericError: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case OPEN_ATTRIBUTE_SIDEBAR:
      return state.set('show', true).set('model', action.payload);

    case CLOSE_ATTRIBUTE_SIDEBAR:
      return initialState;

    case SET_EDIT_ATTRIBUTE_PROPERTY:
      return state.set('dirty', true)
        .setIn(['model', action.payload.name], action.payload.value);

    case UPDATE_REFLEXIS_ATTRIBUTE_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : new Map());
      });

    case DELETE_REFLEXIS_ATTRIBUTE_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : new Map());
      });

    case UPDATE_REFLEXIS_ATTRIBUTE_PENDING:
    case DELETE_REFLEXIS_ATTRIBUTE_PENDING:
      return state.set('saving', true);

    case UPDATE_REFLEXIS_ATTRIBUTE_FULFILLED:
    case DELETE_REFLEXIS_ATTRIBUTE_FULFILLED:
      return initialState;
  }

  return state;
}
