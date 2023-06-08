import {Map, fromJS} from 'immutable';
import {
  CANCEL_BULK_DELETE_STANDARDS_REVISIONS,
  SHOW_CONFIRM_BULK_DELETE_STANDARDS_REVISIONS,
  BULK_DELETE_STANDARDS_REVISIONS_FULFILLED,
  BULK_DELETE_STANDARDS_REVISIONS_PENDING,
  BULK_DELETE_STANDARDS_REVISIONS_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  deleting: false,
  validationErrors: Map(),
  model: new Map({
    selectedStandardIds: null,
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CONFIRM_BULK_DELETE_STANDARDS_REVISIONS: {
      const {standardIds} = action.payload;
      const model = {
        StandardIds: standardIds.toJS(),
      };
      return state.withMutations(map =>
        map.set('show', true)
          .set('model', model));
    }

    case BULK_DELETE_STANDARDS_REVISIONS_PENDING:
      return state.set('deleting', true);

    case CANCEL_BULK_DELETE_STANDARDS_REVISIONS:
    case BULK_DELETE_STANDARDS_REVISIONS_FULFILLED:
      return initialState;

    case BULK_DELETE_STANDARDS_REVISIONS_REJECTED: {
      const {status, data} = action.payload.response || {};
      return state.withMutations(map => {
        map.set('deleting', false);
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });
    }
    default:
      return state;
  }
}
