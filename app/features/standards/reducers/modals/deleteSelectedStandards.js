import {Map, fromJS} from 'immutable';
import {
  CANCEL_DELETE_SELECTED_STANDARDS,
  SHOW_DELETE_SELECTED_STANDARDS,
  DELETE_STANDARDS_FULFILLED,
  DELETE_STANDARDS_PENDING,
  DELETE_STANDARDS_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  deleting: false,
  validationErrors: Map(),
  model: new Map({
    selectedStandardIds: null,
    name: null,
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_DELETE_SELECTED_STANDARDS: {
      const model = Map({
        selectedStandardIds: action.payload,
      });

      return state.withMutations(map =>
        map.set('show', true)
          .set('model', model));
    }

    case DELETE_STANDARDS_PENDING:
      return state.set('deleting', true);

    case CANCEL_DELETE_SELECTED_STANDARDS:
    case DELETE_STANDARDS_FULFILLED:
      return initialState;

    case DELETE_STANDARDS_REJECTED:
      return state.withMutations(map => {
        map.set('deleting', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
