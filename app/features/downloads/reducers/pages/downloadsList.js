import {Map} from 'immutable';

import {modelsArrayToMapById} from '../../../shared/services';
import {
  BACKGROUND_JOB_FINISHED,
  CLEAR_FINISHED_JOB,
} from '../../../notifications/actions';

import {
  LINK_VISITED,
  LOAD_DOWNLOADS_LIST_PENDING,
  LOAD_DOWNLOADS_LIST_FULFILLED,
  LOAD_DOWNLOADS_LIST_REJECTED,
  FILTER_DOWNLOADS,
  SORT_DOWNLOADS,
} from '../../actions';

const initialState = Map({
  loading: false,
  downloads: Map(),
  linkHistory: Map(),
  finishedJob: false,
  filter: null,
});

export default function (state = initialState, action) {
  switch (action.type) {

    case FILTER_DOWNLOADS:
      return state.set('filter', action.payload);

    case SORT_DOWNLOADS:
      return state.set('sort', action.payload);

    case LINK_VISITED:
      return state.setIn(['linkHistory', action.payload], true);

    case LOAD_DOWNLOADS_LIST_PENDING:
      return state.set('loading', true);

    case LOAD_DOWNLOADS_LIST_FULFILLED:
      return state.withMutations(map =>
        map.set('loading', false)
          .set('downloads', modelsArrayToMapById(action.payload.data)));

    case LOAD_DOWNLOADS_LIST_REJECTED:
      return state.set('loading', false);

    case BACKGROUND_JOB_FINISHED:
      return state.set('finishedJob', true);

    case CLEAR_FINISHED_JOB:
      return state.set('finishedJob', false);

    default:
      return state;
  }
}
