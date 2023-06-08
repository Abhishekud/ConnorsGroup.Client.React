import {http} from '../../shared/services';

export const UPDATE_DEPARTMENT = 'UPDATE_DEPARTMENT';
export const UPDATE_DEPARTMENT_PENDING = `${UPDATE_DEPARTMENT}_PENDING`;
export const UPDATE_DEPARTMENT_FULFILLED = `${UPDATE_DEPARTMENT}_FULFILLED`;
export const UPDATE_DEPARTMENT_REJECTED = `${UPDATE_DEPARTMENT}_REJECTED`;

export function updateDepartment(department) {
  return {
    type: UPDATE_DEPARTMENT,
    payload: http.put(`departments/${department.get('id')}`, department),
  };
}
