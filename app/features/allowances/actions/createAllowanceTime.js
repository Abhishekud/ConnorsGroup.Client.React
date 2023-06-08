import {http} from '../../shared/services';

export const CREATE_ALLOWANCE_TIME = 'CREATE_ALLOWANCE_TIME';
export const CREATE_ALLOWANCE_TIME_PENDING = `${CREATE_ALLOWANCE_TIME}_PENDING`;
export const CREATE_ALLOWANCE_TIME_FULFILLED = `${CREATE_ALLOWANCE_TIME}_FULFILLED`;
export const CREATE_ALLOWANCE_TIME_REJECTED = `${CREATE_ALLOWANCE_TIME}_REJECTED`;

export function createAllowanceTime(model) {
  return {
    type: CREATE_ALLOWANCE_TIME,
    payload: http.post('allowance-times', model),
  };
}
