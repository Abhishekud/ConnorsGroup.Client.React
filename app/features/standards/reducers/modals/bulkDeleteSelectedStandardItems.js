import {Map, fromJS} from 'immutable';
import {
  CANCEL_BULK_DELETE_SELECTED_STANDARD_ITEMS,
  SHOW_CONFIRM_BULK_DELETE_SELECTED_STANDARD_ITEMS,
  BULK_DELETE_SELECTED_STANDARD_ITEMS_FULFILLED,
  BULK_DELETE_SELECTED_STANDARD_ITEMS_PENDING,
  BULK_DELETE_SELECTED_STANDARD_ITEMS_REJECTED,
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
    case SHOW_CONFIRM_BULK_DELETE_SELECTED_STANDARD_ITEMS: {
      const {payload} = action;
      const model = Map({
        id: payload.get('id'),
        selectedElementIds: payload.get('selectedElementIds'),
        selectedStandardElementGroupIds: payload.get('selectedStandardElementGroupIds'),
      });

      return state.withMutations(map =>
        map.set('show', true)
          .set('model', model));
    }

    case BULK_DELETE_SELECTED_STANDARD_ITEMS_PENDING:
      return state.set('deleting', true);

    case CANCEL_BULK_DELETE_SELECTED_STANDARD_ITEMS:
    case BULK_DELETE_SELECTED_STANDARD_ITEMS_FULFILLED:
      return initialState;

    case BULK_DELETE_SELECTED_STANDARD_ITEMS_REJECTED:
      return state.withMutations(map => {
        map.set('deleting', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
