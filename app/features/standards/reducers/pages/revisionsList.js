import {fromJS, List, Map} from 'immutable';
import {
  TOGGLE_SHOW_STANDARD_REVISIONS,
  LOAD_STANDARD_REVISIONS_LIST_FULFILLED,
  LOAD_STANDARD_REVISIONS_LIST_PENDING,
  LOAD_STANDARD_REVISIONS_LIST_REJECTED,
  SORT_STANDARD_REVISIONS_LIST,
  FILTER_STANDARD_REVISIONS_LIST,
  TOGGLE_SELECT_STANDARD_REVISION,
  SELECT_ALL_STANDARD_REVISIONS,
} from '../../actions';

const initialState = new Map({
  loading: false,
  open: false,
  sort: new List(),
  deleting: false,
  filter: null,
  standardRevisions: new List(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SHOW_STANDARD_REVISIONS:
      return state.set('open', !state.get('open'));

    case LOAD_STANDARD_REVISIONS_LIST_PENDING:
      return state.set('loading', true);

    case LOAD_STANDARD_REVISIONS_LIST_FULFILLED:
      return state.withMutations(map =>
        map.set('loading', false)
          .set('standardRevisions', fromJS(action.payload.data)));

    case LOAD_STANDARD_REVISIONS_LIST_REJECTED:
      return state.set('loading', false);

    case TOGGLE_SELECT_STANDARD_REVISION: {
      const index = state.get('standardRevisions').findIndex(s => s.get('revision') === action.payload.id);
      if (index === -1) throw new Error('Unknown standard revision selected');
      return state
        .withMutations(map =>
          map.setIn(['columns', 'selected', 'headerSelectionValue'], !map.get('standardRevisions').some(s => !s.get('selected')))
            .updateIn(['standardRevisions', index, 'selected'], v => !v)
        );
    }

    case SELECT_ALL_STANDARD_REVISIONS: {
      return state.withMutations(map =>
        map.update('standardRevisions', standardRevisions => standardRevisions.map(standardRevision => {
          if (action.payload.ids.includes(standardRevision.get('revision'))) {
            return standardRevision.set('selected', action.payload.selected);
          }
          return standardRevision.set('selected', false);
        })));
    }

    case SORT_STANDARD_REVISIONS_LIST:
      return state.set('sort', action.payload);
    case FILTER_STANDARD_REVISIONS_LIST: {
      return state.withMutations(map =>
        map.set('filter', action.payload)
          .update('standardRevisions', stds => stds.map(std => std.set('selected', false))));
    }

    default:
      return state;
  }
}
