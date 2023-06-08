import {http} from '../../../shared/services';
import moment from 'moment';

export const LOAD_TASK_GROUPS_LIST = 'LOAD_KRONOS_TASK_GROUPS_LIST';
export const LOAD_TASK_GROUPS_LIST_PENDING = `${LOAD_TASK_GROUPS_LIST}_PENDING`;
export const LOAD_TASK_GROUPS_LIST_REJECTED = `${LOAD_TASK_GROUPS_LIST}_REJECTED`;
export const LOAD_TASK_GROUPS_LIST_FULFILLED = `${LOAD_TASK_GROUPS_LIST}_FULFILLED`;

export function loadTaskGroupsList(skip, filterSet, sort, endpointId) {
  const filter = JSON.parse(JSON.stringify(filterSet));
  if (filter) {
    for (let index = 0; index < filter.filters.length; index++) {
      if (filter.filters[index].field === 'exportStartTime') {
        filter.filters[index].value = moment(filter.filters[index].value).format();
        switch (filter.filters[index].operator) {
          case 'gt': filter.filters[index].operator = 'after'; break;
          case 'gte': filter.filters[index].operator = 'afteroron'; break;
          case 'lt': filter.filters[index].operator = 'before'; break;
          case 'lte': filter.filters[index].operator = 'beforeoron'; break;
          case 'eq': filter.filters[index].operator = 'on'; break;
        }
      }
      if (filter.filters[index].field === 'success') {
        switch (filter.filters[index].value) {
          case 'Success':
            filter.filters[index].value = 1; break;
          case 'Failure':
            filter.filters[index].value = 0; break;
          case 'NotSent':
            filter.filters[index].value = 2; break;
        }

      }
    }
  }
  return {
    type: LOAD_TASK_GROUPS_LIST,
    payload: http.post('/kronos/taskgroup/list', {skip, filter, sort, endpointId}),
  };

}
