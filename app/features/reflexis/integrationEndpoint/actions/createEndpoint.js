import {http} from '../../../shared/services';

export const CREATE_ENDPOINT = 'REFLEXIS/INTEGRATION_ENDPOINT/CREATE_ENDPOINT';

export const CREATE_ENDPOINT_PENDING = `${CREATE_ENDPOINT}_PENDING`;
export const CREATE_ENDPOINT_FULFILLED = `${CREATE_ENDPOINT}_FULFILLED`;
export const CREATE_ENDPOINT_REJECTED = `${CREATE_ENDPOINT}_REJECTED`;

export function createEndpoint(endpoint) {
  return {
    type: CREATE_ENDPOINT,
    payload: http.post('reflexis/endpoints', endpoint),
  };
}
