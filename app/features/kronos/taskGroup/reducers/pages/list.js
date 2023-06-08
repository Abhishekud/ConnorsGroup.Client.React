import {fromJS, Map} from 'immutable';
import {LOAD_ENDPOINTS_LIST_FOR_SELECT_FULFILLED} from '../../../integrationEndpoint/actions';
import {
  CREATE,
  SAVE_EDIT_FULFILLED,
  CANCEL_EDIT,
  DELETE_FULFILLED,
  CREATE_FULFILLED,
  LOAD_TASK_GROUPS_LIST,
  LOAD_TASK_GROUPS_LIST_FULFILLED,
  LOAD_TASK_GROUPS_LIST_PENDING,
  LOAD_TASK_GROUPS_LIST_REJECTED,

  LOAD_TASK_GROUP_FULFILLED,
  LOAD_TASK_GROUP_REJECTED,
  LOAD_TASK_GROUP_PENDING,
  IMPORT_KRONOS_TASK_GROUPS_FULFILLED,
} from '../../actions';

import {POLL_BACKGROUND_JOBS_FULFILLED} from '../../../../shared/actions/index';
import {KRONOS_TASK_GROUPS_IMPORTER} from '../../../../shared/constants/backgroundJobs';
const initialState = fromJS({
  selectedTaskGroup: {},
  kronosEndpoints: [],
  activeBackgroundJobs: false,
  backgroundJobStarted: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_TASK_GROUPS_LIST:
    case LOAD_TASK_GROUPS_LIST_FULFILLED: {

      return state
        .set('loading', false)
        .set('backgroundJobStarted', false);
    }
    case LOAD_TASK_GROUPS_LIST_PENDING:
      return state.set('loading', true);
    case LOAD_TASK_GROUPS_LIST_REJECTED:
      return state.set('loading', false);

    case CREATE:
    case CREATE_FULFILLED:
      if (action.payload.status === 200) {
        const data = fromJS(action.payload.data);
        return state.withMutations(map => {
          map.set('loading', false)
            .set('selectedTaskGroup', data);
        });
      }
      return state;
    case DELETE_FULFILLED: {
      return state.set('selectedTaskGroup', new Map());
    }

    case LOAD_TASK_GROUP_FULFILLED:
      return state.set('loading', false)
        .set('selectedTaskGroup', fromJS(action.payload.data));
    case LOAD_TASK_GROUP_PENDING:
      return state.set('loading', true);
    case LOAD_TASK_GROUP_REJECTED:
      return state.set('loading', false);

    case CANCEL_EDIT:
      return state.set('selectedTaskGroup', fromJS({}));
    case SAVE_EDIT_FULFILLED: {
      return state.set('selectedTaskGroup', new Map());
    }

    case LOAD_ENDPOINTS_LIST_FOR_SELECT_FULFILLED:
      return state.set('kronosEndpoints', fromJS(action.payload.data));

    case IMPORT_KRONOS_TASK_GROUPS_FULFILLED:
      return state.withMutations(map => {
        map.set('activeBackgroundJobs', true)
          .set('loading', true);
      });
    case POLL_BACKGROUND_JOBS_FULFILLED: {
      const {activeJobs, backgroundJobTypes} = action.payload.data;

      if (backgroundJobTypes.includes(KRONOS_TASK_GROUPS_IMPORTER)) {
        return state.withMutations(map => {
          if (activeJobs) map.set('backgroundJobStarted', true);
          map.set('activeBackgroundJobs', activeJobs);
        });
      }

      return state;
    }
  }
  return state;
}
