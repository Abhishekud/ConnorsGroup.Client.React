import {http} from '../../shared/services';

export const DELETE_DEPARTMENT = 'DELETE_DEPARTMENT';
export const DELETE_DEPARTMENT_PENDING = `${DELETE_DEPARTMENT}_PENDING`;
export const DELETE_DEPARTMENT_FULFILLED = `${DELETE_DEPARTMENT}_FULFILLED`;
export const DELETE_DEPARTMENT_REJECTED = `${DELETE_DEPARTMENT}_REJECTED`;

export function deleteDepartment(departmentId) {
  return {
    type: DELETE_DEPARTMENT,
    payload: http.delete(`departments/${departmentId}`),
  };
}
