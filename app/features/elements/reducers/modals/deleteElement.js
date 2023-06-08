import {Map, fromJS} from 'immutable';
import {
  CANCEL_DELETE_ELEMENT,
  SHOW_DELETE_ELEMENT,
  DELETE_ELEMENT_FULFILLED,
  DELETE_ELEMENT_PENDING,
  DELETE_ELEMENT_REJECTED,
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
    case SHOW_DELETE_ELEMENT: {
      const {payload} = action;
      const model = Map({
        id: payload.get('id'),
        name: payload.get('name'),
      });

      return state.withMutations(map =>
        map.set('show', true)
          .set('model', model));
    }

    case DELETE_ELEMENT_PENDING:
      return state.set('deleting', true);

    case CANCEL_DELETE_ELEMENT:
    case DELETE_ELEMENT_FULFILLED:
      return initialState;

    case DELETE_ELEMENT_REJECTED:
      return state.withMutations(map => {
        map.set('deleting', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
