import {http} from '../../shared/services';

export const UPDATE_ALLOWANCE_TIME = 'UPDATE_ALLOWANCE_TIME';
export const UPDATE_ALLOWANCE_TIME_PENDING = `${UPDATE_ALLOWANCE_TIME}_PENDING`;
export const UPDATE_ALLOWANCE_TIME_FULFILLED = `${UPDATE_ALLOWANCE_TIME}_FULFILLED`;
export const UPDATE_ALLOWANCE_TIME_REJECTED = `${UPDATE_ALLOWANCE_TIME}_REJECTED`;

export function updateAllowanceTime(allowanceTime) {
  return {
    type: UPDATE_ALLOWANCE_TIME,
    payload: http.put(`allowance-times/${allowanceTime.get('id')}`, allowanceTime),
  };
}
