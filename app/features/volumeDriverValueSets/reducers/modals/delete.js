import {Map, fromJS} from 'immutable';
import {
  CANCEL_DELETE_VOLUME_DRIVER_VALUE_SET,
  SHOW_DELETE_VOLUME_DRIVER_VALUE_SET,
  DELETE_VOLUME_DRIVER_VALUE_SET_FULFILLED,
  DELETE_VOLUME_DRIVER_VALUE_SET_PENDING,
  DELETE_VOLUME_DRIVER_VALUE_SET_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  deleting: false,
  validationErrors: Map(),
  model: new Map({
    id: null,
    name: '',
    description: '',
    isDefault: false,
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_DELETE_VOLUME_DRIVER_VALUE_SET: {
      const {payload} = action;
      const model = Map({
        id: payload.get('id'),
        name: payload.get('name'),
        description: payload.get('description'),
        isDefault: payload.get('isDefault'),
      });

      return state.withMutations(map =>
        map.set('show', true)
          .set('model', model));
    }

    case DELETE_VOLUME_DRIVER_VALUE_SET_PENDING:
      return state.set('deleting', true);

    case CANCEL_DELETE_VOLUME_DRIVER_VALUE_SET:
    case DELETE_VOLUME_DRIVER_VALUE_SET_FULFILLED:
      return initialState;

    case DELETE_VOLUME_DRIVER_VALUE_SET_REJECTED:
      return state.withMutations(map => {
        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : initialState.get('validationErrors'))
          .set('deleting', false);
      });

    default:
      return state;
  }
}
