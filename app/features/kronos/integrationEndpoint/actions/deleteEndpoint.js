import {http} from '../../../shared/services';

export const DELETE_KRONOS_ENDPOINT = 'DELETE_KRONOS_ENDPOINT';
export const DELETE_KRONOS_ENDPOINT_PENDING = `${DELETE_KRONOS_ENDPOINT}_PENDING`;
export const DELETE_KRONOS_ENDPOINT_FULFILLED = `${DELETE_KRONOS_ENDPOINT}_FULFILLED`;
export const DELETE_KRONOS_ENDPOINT_REJECTED = `${DELETE_KRONOS_ENDPOINT}_REJECTED`;

export function deleteEndpoint(endpoint) {
  return {
    type: DELETE_KRONOS_ENDPOINT,
    payload: http.post('kronos/endpoint/delete', endpoint),
  };
}
