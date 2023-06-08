import {http} from '../../../shared/services';
import moment from 'moment';
import {dateTimeFilterField} from '../constants/dateTimeFilterFields';

export const LOAD_LABOR_STANDARDS_LIST = 'LOAD_KRONOS_LABOR_STANDARDS_LIST';
export const LOAD_LABOR_STANDARDS_LIST_PENDING = `${LOAD_LABOR_STANDARDS_LIST}_PENDING`;
export const LOAD_LABOR_STANDARDS_LIST_FULFILLED = `${LOAD_LABOR_STANDARDS_LIST}_FULFILLED`;
export const LOAD_LABOR_STANDARDS_LIST_REJECTED = `${LOAD_LABOR_STANDARDS_LIST}_REJECTED`;

export function loadLaborStandardsList(skip, filterSet, sort, endpointId) {
  const filter = JSON.parse(JSON.stringify(filterSet));
  if (filter) {
    for (let index = 0; index < filter.filters.length; index++) {
      if (dateTimeFilterField.includes(filter.filters[index].field)) {
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
            filter.filters[index].value = null;
            filter.filters[index].operator = 'isnull';
            break;
        }

      }
    }
  }
  return {
    type: LOAD_LABOR_STANDARDS_LIST,
    payload: http.post('kronos/laborstandard/list', {skip, filter, sort, endpointId}),
  };
}
