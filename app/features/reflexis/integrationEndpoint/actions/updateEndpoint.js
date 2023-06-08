import {http} from '../../../shared/services';

export const UPDATE_ENDPOINT = 'REFLEXIS/INTEGRATION_ENDPOINT/UPDATE_ENDPOINT';

export const UPDATE_ENDPOINT_PENDING = `${UPDATE_ENDPOINT}_PENDING`;
export const UPDATE_ENDPOINT_FULFILLED = `${UPDATE_ENDPOINT}_FULFILLED`;
export const UPDATE_ENDPOINT_REJECTED = `${UPDATE_ENDPOINT}_REJECTED`;

export function updateEndpoint(endpoint) {
  return {
    type: UPDATE_ENDPOINT,
    payload: http.put(`reflexis/endpoints/${endpoint.get('id')}`, endpoint),
  };
}
