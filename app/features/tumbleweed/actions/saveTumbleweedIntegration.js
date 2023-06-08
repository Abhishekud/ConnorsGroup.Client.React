import {http} from '../../shared/services';

export const SAVE_TUMBLEWEED_INTEGRATION = 'SAVE_TUMBLEWEED_INTEGRATION';
export const SAVE_TUMBLEWEED_INTEGRATION_PENDING = `${SAVE_TUMBLEWEED_INTEGRATION}_PENDING`;
export const SAVE_TUMBLEWEED_INTEGRATION_FULFILLED = `${SAVE_TUMBLEWEED_INTEGRATION}_FULFILLED`;
export const SAVE_TUMBLEWEED_INTEGRATION_REJECTED = `${SAVE_TUMBLEWEED_INTEGRATION}_REJECTED`;

export function saveTumbleweedIntegration(model) {
  return {
    type: SAVE_TUMBLEWEED_INTEGRATION,
    payload: http.put('tumbleweed/integration', model),
  };
}
