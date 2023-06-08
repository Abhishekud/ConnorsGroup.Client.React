import {http} from '../../shared/services';

export const LOAD_TUMBLEWEED_INTEGRATION = 'LOAD_TUMBLEWEED_INTEGRATION';
export const LOAD_TUMBLEWEED_INTEGRATION_PENDING = `${LOAD_TUMBLEWEED_INTEGRATION}_PENDING`;
export const LOAD_TUMBLEWEED_INTEGRATION_REJECTED = `${LOAD_TUMBLEWEED_INTEGRATION}_REJECTED`;
export const LOAD_TUMBLEWEED_INTEGRATION_FULFILLED = `${LOAD_TUMBLEWEED_INTEGRATION}_FULFILLED`;

export function loadTumbleweedIntegration() {
  return {
    type: LOAD_TUMBLEWEED_INTEGRATION,
    payload: http.get('tumbleweed/integration'),
  };
}
