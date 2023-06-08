import {fromJS, Map} from 'immutable';
import {
  CREATE,
  CANCEL_EDIT,
  SELECT_JOB,
  SORT_JOBS,
  FILTER_JOBS,
  DELETE,
  CREATE_FULFILLED,

  LOAD_JOBS_LIST_REJECTED,
  LOAD_JOBS_LIST_PENDING,
  LOAD_JOBS_LIST_FULFILLED,

  SAVE_EDIT_FULFILLED,
} from '../../actions';

const initialState = fromJS({
  jobs: [],
  selectedJob: {},
  sort: [],
  filter: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE:
    case CREATE_FULFILLED:
      if (action.payload.status === 200) {
        return state.update('jobs', lds => lds.push(fromJS(action.payload.data)));
      }
      return state;
    case DELETE: {
      const index = state.get('jobs').findIndex(d => d.get('id') === action.payload.get('id'));
      return state.deleteIn(['jobs', index]).set('selectedJob', new Map());
    }
    case SELECT_JOB:
      return state.set('selectedJob', action.payload);
    case CANCEL_EDIT:
      return state.set('selectedJob', new Map());
    case SORT_JOBS:
      return state.set('sort', action.payload);
    case FILTER_JOBS:
      return state.set('filter', action.payload);

    case SAVE_EDIT_FULFILLED: {
      const index = state.get('jobs').findIndex(d => d.get('id') === action.payload.data.id);
      return state.setIn(['jobs', index], fromJS(action.payload.data)).set('selectedJob', new Map());
    }

    case LOAD_JOBS_LIST_PENDING:
      return state.set('loading', true);
    case LOAD_JOBS_LIST_REJECTED:
      return state.set('loading', false);
    case LOAD_JOBS_LIST_FULFILLED:
      return state.set('jobs', fromJS(action.payload.data.jobs)).set('loading', false);
  }
  return state;
}
