import {http} from '../../../shared/services';

export const CREATE_INTEGRATION_REQUEST = 'REFLEXIS/CREATE_INTEGRATION_REQUEST';
export const CREATE_INTEGRATION_REQUEST_PENDING = `${CREATE_INTEGRATION_REQUEST}_PENDING`;
export const CREATE_INTEGRATION_REQUEST_FULFILLED = `${CREATE_INTEGRATION_REQUEST}_FULFILLED`;
export const CREATE_INTEGRATION_REQUEST_REJECTED = `${CREATE_INTEGRATION_REQUEST}_REJECTED`;

export function createIntegrationRequest(model) {
  return {
    type: CREATE_INTEGRATION_REQUEST,
    payload: http.post(`reflexis/endpoints/${model.get('endpointId')}/integrations`, model),
  };
}
