import {http} from '../../shared/services';

export const LOAD_DEPARTMENTS_LIST = 'LOAD_DEPARTMENTS_LIST';
export const LOAD_DEPARTMENTS_LIST_PENDING = `${LOAD_DEPARTMENTS_LIST}_PENDING`;
export const LOAD_DEPARTMENTS_LIST_FULFILLED = `${LOAD_DEPARTMENTS_LIST}_FULFILLED`;
export const LOAD_DEPARTMENTS_LIST_REJECTED = `${LOAD_DEPARTMENTS_LIST}_REJECTED`;

export function loadDepartmentsList() {
  return {
    type: LOAD_DEPARTMENTS_LIST,
    payload: http.get('departments/list'),
  };
}
