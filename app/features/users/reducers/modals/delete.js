import {fromJS, Map} from 'immutable';
import {
  CANCEL_DELETE_USER,
  SHOW_DELETE_USER,
  DELETE_USER_FULFILLED,
  DELETE_USER_PENDING,
  DELETE_USER_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  deleting: false,
  validationErrors: new Map(),
  model: new Map({
    id: 0,
    email: '',
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_DELETE_USER: {
      const {payload} = action;
      const model = Map({
        id: payload.get('id'),
        email: payload.get('email'),
      });

      return state.withMutations(map =>
        map.set('show', true)
          .set('model', model));
    }

    case DELETE_USER_PENDING:
      return state.set('deleting', true);

    case CANCEL_DELETE_USER:
    case DELETE_USER_FULFILLED:
      return initialState;

    case DELETE_USER_REJECTED:
      return state.withMutations(map => {
        map.set('deleting', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
