import {http} from '../../../shared/services';

export const UPDATE_KRONOS_ENDPOINT = 'UPDATE_KRONOS_ENDPOINT';
export const UPDATE_KRONOS_ENDPOINT_PENDING = `${UPDATE_KRONOS_ENDPOINT}_PENDING`;
export const UPDATE_KRONOS_ENDPOINT_FULFILLED = `${UPDATE_KRONOS_ENDPOINT}_FULFILLED`;
export const UPDATE_KRONOS_ENDPOINT_REJECTED = `${UPDATE_KRONOS_ENDPOINT}_REJECTED`;

export function update(endpoint) {
  return {
    type: UPDATE_KRONOS_ENDPOINT,
    payload: http.post('kronos/endpoint/update', endpoint),
  };
}
