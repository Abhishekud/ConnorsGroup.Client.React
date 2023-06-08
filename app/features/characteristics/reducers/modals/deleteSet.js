import {Map, fromJS} from 'immutable';
import {
  CANCEL_DELETE_CHARACTERISTIC_SET,
  SHOW_DELETE_CHARACTERISTIC_SET,
  DELETE_CHARACTERISTIC_SET_FULFILLED,
  DELETE_CHARACTERISTIC_SET_PENDING,
  DELETE_CHARACTERISTIC_SET_REJECTED,
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
    case SHOW_DELETE_CHARACTERISTIC_SET: {
      const {payload} = action;
      const model = Map({
        id: payload.get('id'),
        name: payload.get('name'),
      });

      return state.withMutations(map =>
        map.set('show', true)
          .set('model', model));
    }

    case DELETE_CHARACTERISTIC_SET_PENDING:
      return state.set('deleting', true);

    case CANCEL_DELETE_CHARACTERISTIC_SET:
    case DELETE_CHARACTERISTIC_SET_FULFILLED:
      return initialState;

    case DELETE_CHARACTERISTIC_SET_REJECTED:
      return state.withMutations(map => {
        map.set('deleting', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
