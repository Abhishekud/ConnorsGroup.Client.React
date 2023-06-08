import {Map, fromJS} from 'immutable';
import {
  CANCEL_DELETE_ATTRIBUTE,
  SHOW_DELETE_ATTRIBUTE,
  DELETE_ATTRIBUTE_FULFILLED,
  DELETE_ATTRIBUTE_PENDING,
  DELETE_ATTRIBUTE_REJECTED,
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
    case SHOW_DELETE_ATTRIBUTE: {
      const {payload} = action;
      const model = Map({
        id: payload.get('id'),
        name: payload.get('name'),
      });

      return state.withMutations(map =>
        map.set('show', true)
          .set('model', model));
    }

    case DELETE_ATTRIBUTE_PENDING:
      return state.set('deleting', true);

    case CANCEL_DELETE_ATTRIBUTE:
    case DELETE_ATTRIBUTE_FULFILLED:
      return initialState;

    case DELETE_ATTRIBUTE_REJECTED:
      return state.withMutations(map => {
        map.set('deleting', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
