import {Map, fromJS} from 'immutable';
import {
  CANCEL_DELETE_ROLE,
  SHOW_DELETE_ROLE,
  DELETE_ROLE_FULFILLED,
  DELETE_ROLE_PENDING,
  DELETE_ROLE_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  deleting: false,
  validationErrors: Map(),
  model: new Map({
    id: null,
    name: null,
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_DELETE_ROLE: {
      const {payload} = action;

      return state.withMutations(map =>
        map.set('show', true)
          .set('model', payload));
    }

    case DELETE_ROLE_PENDING:
      return state.set('deleting', true);

    case CANCEL_DELETE_ROLE:
    case DELETE_ROLE_FULFILLED:
      return initialState;

    case DELETE_ROLE_REJECTED:
      return state.withMutations(map => {
        map.set('deleting', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
