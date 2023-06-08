import {Map, fromJS} from 'immutable';
import {
  CANCEL_DELETE_LABOR_CATEGORY,
  SHOW_DELETE_LABOR_CATEGORY,
  DELETE_LABOR_CATEGORY_FULFILLED,
  DELETE_LABOR_CATEGORY_PENDING,
  DELETE_LABOR_CATEGORY_REJECTED,
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
    case SHOW_DELETE_LABOR_CATEGORY: {
      const {payload} = action;
      const model = Map({
        id: payload.get('id'),
        name: payload.get('name'),
      });

      return state.withMutations(map =>
        map.set('show', true)
          .set('model', model));
    }

    case DELETE_LABOR_CATEGORY_PENDING:
      return state.set('deleting', true);

    case CANCEL_DELETE_LABOR_CATEGORY:
    case DELETE_LABOR_CATEGORY_FULFILLED:
      return initialState;

    case DELETE_LABOR_CATEGORY_REJECTED:
      return state.withMutations(map => {
        map.set('deleting', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
