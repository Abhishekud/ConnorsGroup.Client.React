import {fromJS, Map} from 'immutable';
import {LOAD_ENDPOINTS_LIST_FOR_SELECT_FULFILLED} from '../../../integrationEndpoint/actions';
import {
  CANCEL_EDIT,
  DELETE_FULFILLED,

  CREATE_FULFILLED,
  CREATE_PENDING,
  CREATE_REJECTED,

  LOAD_TASK_GROUPS_LIST_FULFILLED,
  LOAD_TASK_GROUPS_LIST_PENDING,
  LOAD_TASK_GROUPS_LIST_REJECTED,

  LOAD_TASKS_LIST_FULFILLED,
  LOAD_TASKS_LIST_PENDING,
  LOAD_TASKS_LIST_REJECTED,

  LOAD_TASK_FULFILLED,
  LOAD_TASK_PENDING,
  LOAD_TASK_REJECTED,

  SAVE_EDIT_FULFILLED,
  IMPORT_KRONOS_TASKS_FULFILLED,
} from '../../actions';

import {POLL_BACKGROUND_JOBS_FULFILLED} from '../../../../shared/actions/index';
import {KRONOS_TASK_IMPORTER} from '../../../../shared/constants/backgroundJobs';
const initialState = fromJS({
  selectedTask: {},
  taskGroups: [],
  kronosEndpoints: [],
  activeBackgroundJobs: false,
  backgroundJobStarted: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_TASK_GROUPS_LIST_FULFILLED:
      return state.set('loading', false).set('taskGroups', fromJS(action.payload.data.taskGroups));
    case LOAD_TASK_GROUPS_LIST_PENDING:
      return state.set('loading', true);
    case LOAD_TASK_GROUPS_LIST_REJECTED:
      return state.set('loading', false);

    case LOAD_TASKS_LIST_FULFILLED:
      return state.set('loading', false)
        .set('backgroundJobStarted', false);
    case LOAD_TASKS_LIST_PENDING:
      return state.set('loading', true);
    case LOAD_TASKS_LIST_REJECTED:
      return state.set('loading', false);

    case LOAD_TASK_FULFILLED:
      return state.set('loading', false).set('selectedTask', fromJS(action.payload.data));
    case LOAD_TASK_PENDING:
      return state.set('loading', true);
    case LOAD_TASK_REJECTED:
      return state.set('loading', false);

    case CREATE_FULFILLED:
      if (action.payload.status === 200) {
        const data = fromJS(action.payload.data);
        return state.withMutations(map => {
          map.set('loading', false)
            .set('selectedTask', data);
        });
      }
      return state;
    case CREATE_PENDING:
      return state.set('loading', true);
    case CREATE_REJECTED:
      return state.set('loading', false);

    case DELETE_FULFILLED: {
      return state.set('selectedTask', new Map());
    }

    case CANCEL_EDIT:
      return state.set('selectedTask', new Map());
    case SAVE_EDIT_FULFILLED: {
      return state.set('selectedTask', new Map());
    }

    case LOAD_ENDPOINTS_LIST_FOR_SELECT_FULFILLED:
      return state.set('kronosEndpoints', fromJS(action.payload.data));

    case IMPORT_KRONOS_TASKS_FULFILLED:
      return state.withMutations(map => {
        map.set('activeBackgroundJobs', true);
      });

    case POLL_BACKGROUND_JOBS_FULFILLED: {
      const {activeJobs, backgroundJobTypes} = action.payload.data;

      if (backgroundJobTypes.includes(KRONOS_TASK_IMPORTER)) {
        return state.withMutations(map => {
          if (activeJobs) map.set('backgroundJobStarted', true);
          map.set('activeBackgroundJobs', activeJobs);
        });
      }
    }
  }
  return state;
}
