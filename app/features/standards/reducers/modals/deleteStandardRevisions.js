import {fromJS, Map} from 'immutable';
import {
  SHOW_CONFIRM_DELETE_STANDARD_REVISIONS,
  CANCEL_DELETE_STANDARD_REVISIONS,
  DELETE_STANDARD_REVISIONS_PENDING,
  DELETE_STANDARD_REVISIONS_FULFILLED,
  DELETE_STANDARD_REVISIONS_REJECTED,
} from '../../actions';

const initialState = new Map({
  deleting: false,
  show: false,
  validationErrors: Map(),
  model: new Map({
    standardId: null,
    revisions: null,
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {

    case SHOW_CONFIRM_DELETE_STANDARD_REVISIONS: {
      const {standardRevisions, standardId} = action.payload;
      const model = {
        standardId: Number(standardId),
        revisions: standardRevisions,
      };
      return state.withMutations(map =>
        map.set('show', true)
          .set('model', model)
      );
    }

    case CANCEL_DELETE_STANDARD_REVISIONS: {
      return state.withMutations(map =>
        map.set('show', initialState.get('show'))
          .set('model', initialState.get('model'))
      ); }

    case DELETE_STANDARD_REVISIONS_PENDING:
      return state.set('deleting', true);

    case DELETE_STANDARD_REVISIONS_FULFILLED:
      return initialState;

    case DELETE_STANDARD_REVISIONS_REJECTED: {
      const {status, data} = action.payload.response || {};
      return state.withMutations(map => {
        map.set('deleting', false);
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      }); }

    default:
      return state;
  }
}
