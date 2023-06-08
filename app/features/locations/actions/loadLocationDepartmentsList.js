import {http} from '../../shared/services';

export const LOAD_LOCATION_DEPARTMENTS_LIST = 'LOAD_LOCATION_DEPARTMENTS_LIST';
export const LOAD_LOCATION_DEPARTMENTS_LIST_PENDING = `${LOAD_LOCATION_DEPARTMENTS_LIST}_PENDING`;
export const LOAD_LOCATION_DEPARTMENTS_LIST_FULFILLED = `${LOAD_LOCATION_DEPARTMENTS_LIST}_FULFILLED`;
export const LOAD_LOCATION_DEPARTMENTS_LIST_REJECTED = `${LOAD_LOCATION_DEPARTMENTS_LIST}_REJECTED`;

export function loadLocationDepartmentsList(filters, sorts, pager) {
  // pager can have skip and pageSize as parameters. Bydefault server would take 100 as pageSize if not passed.
  return {
    type: LOAD_LOCATION_DEPARTMENTS_LIST,
    payload: http.post('locations/list/departments', {filters, sorts, pager}),
  };
}
