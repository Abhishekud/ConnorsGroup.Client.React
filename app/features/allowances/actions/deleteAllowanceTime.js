import {http} from '../../shared/services';

export const DELETE_ALLOWANCE_TIME = 'DELETE_ALLOWANCE_TIME';
export const DELETE_ALLOWANCE_TIME_PENDING = `${DELETE_ALLOWANCE_TIME}_PENDING`;
export const DELETE_ALLOWANCE_TIME_FULFILLED = `${DELETE_ALLOWANCE_TIME}_FULFILLED`;
export const DELETE_ALLOWANCE_TIME_REJECTED = `${DELETE_ALLOWANCE_TIME}_REJECTED`;

export function deleteAllowanceTime(allowanceTimeId) {
  return {
    type: DELETE_ALLOWANCE_TIME,
    payload: http.delete(`allowance-times/${allowanceTimeId}`),
  };
}
