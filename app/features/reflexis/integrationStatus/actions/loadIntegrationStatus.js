import {http} from '../../../shared/services';

export const LOAD_INTEGRATION_STATUS = 'REFLEXIS/INTEGRATION_STATUS/LOAD';
export const LOAD_INTEGRATION_STATUS_PENDING = `${LOAD_INTEGRATION_STATUS}_PENDING`;
export const LOAD_INTEGRATION_STATUS_FULFILLED = `${LOAD_INTEGRATION_STATUS}_FULFILLED`;
export const LOAD_INTEGRATION_STATUS_REJECTED = `${LOAD_INTEGRATION_STATUS}_REJECTED`;

export function loadIntegrationStatus(endpointId, id) {
  return {
    type: LOAD_INTEGRATION_STATUS,
    payload: http.get(`reflexis/endpoints/${endpointId}/requests/${id}`),
  };
}
