import {http} from '../../shared/services';

export const CREATE_DEPARTMENT = 'CREATE_DEPARTMENT';
export const CREATE_DEPARTMENT_PENDING = `${CREATE_DEPARTMENT}_PENDING`;
export const CREATE_DEPARTMENT_FULFILLED = `${CREATE_DEPARTMENT}_FULFILLED`;
export const CREATE_DEPARTMENT_REJECTED = `${CREATE_DEPARTMENT}_REJECTED`;

export function createDepartment(model) {
  return {
    type: CREATE_DEPARTMENT,
    payload: http.post('departments', model),
  };
}
