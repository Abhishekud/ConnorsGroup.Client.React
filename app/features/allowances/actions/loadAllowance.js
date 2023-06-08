import http from '../../shared/services/http';

export const LOAD_ALLOWANCE = 'LOAD_ALLOWANCE';
export const LOAD_ALLOWANCE_PENDING = `${LOAD_ALLOWANCE}_PENDING`;
export const LOAD_ALLOWANCE_FULFILLED = `${LOAD_ALLOWANCE}_FULFILLED`;
export const LOAD_ALLOWANCE_REJECTED = `${LOAD_ALLOWANCE}_REJECTED`;

export function loadAllowance(id) {
  return {
    type: LOAD_ALLOWANCE,
    payload: http.get(`allowances/${id}`),
  };
}
