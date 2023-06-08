import {http} from '../../../shared/services';

export const CREATE_KRONOS_ENDPOINT = 'CREATE_KRONOS_ENDPOINT';
export const CREATE_KRONOS_ENDPOINT_PENDING = `${CREATE_KRONOS_ENDPOINT}_PENDING`;
export const CREATE_KRONOS_ENDPOINT_FULFILLED = `${CREATE_KRONOS_ENDPOINT}_FULFILLED`;
export const CREATE_KRONOS_ENDPOINT_REJECTED = `${CREATE_KRONOS_ENDPOINT}_REJECTED`;

export function create(endpoint) {
  return {
    type: CREATE_KRONOS_ENDPOINT,
    payload: http.post('kronos/endpoint', endpoint),
  };
}
