import {http} from '../../shared/services';

export const DUPLICATE_ALLOWANCE = 'DUPLICATE_ALLOWANCE';
export const DUPLICATE_ALLOWANCE_PENDING = `${DUPLICATE_ALLOWANCE}_PENDING`;
export const DUPLICATE_ALLOWANCE_FULFILLED = `${DUPLICATE_ALLOWANCE}_FULFILLED`;
export const DUPLICATE_ALLOWANCE_REJECTED = `${DUPLICATE_ALLOWANCE}_REJECTED`;

export function duplicateAllowance(allowanceId, model) {
  return {
    type: DUPLICATE_ALLOWANCE,
    payload: http.post(`allowances/${allowanceId}/duplicate`, model),
  };
}
