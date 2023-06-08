import {Map, fromJS} from 'immutable';
import {
  CANCEL_DELETE_LOCATION,
  SHOW_DELETE_LOCATION,
  SHOW_BULK_DELETE_LOCATION,
  DELETE_LOCATION_FULFILLED,
  DELETE_LOCATION_PENDING,
  DELETE_LOCATION_REJECTED,
  BULK_DELETE_LOCATION_FULFILLED,
  BULK_DELETE_LOCATION_PENDING,
  BULK_DELETE_LOCATION_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  deleting: false,
  validationErrors: Map(),
  bulkModel: Map(),
  model: new Map({
    id: null,
    name: null,
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_DELETE_LOCATION: {
      const {payload} = action;
      const model = Map({
        id: payload.get('id'),
        name: payload.get('name'),
      });

      return state.withMutations(map =>
        map.set('show', true)
          .set('model', model));
    }

    case SHOW_BULK_DELETE_LOCATION: {
      const {payload} = action;
      const model = Map({
        locationIds: payload,
      });

      return state.withMutations(map =>
        map.set('show', true)
          .set('bulkModel', model));
    }

    case DELETE_LOCATION_PENDING:
      return state.set('deleting', true);

    case CANCEL_DELETE_LOCATION:
    case DELETE_LOCATION_FULFILLED:
      return initialState;

    case DELETE_LOCATION_REJECTED:
      return state.withMutations(map => {
        map.set('deleting', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    case BULK_DELETE_LOCATION_PENDING:
      return state.set('deleting', true);

    case BULK_DELETE_LOCATION_FULFILLED:
      return initialState;

    case BULK_DELETE_LOCATION_REJECTED:
      return state.withMutations(map => {
        map.set('deleting', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
