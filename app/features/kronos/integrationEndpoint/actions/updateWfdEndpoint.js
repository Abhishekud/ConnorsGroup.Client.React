import {http} from '../../../shared/services';

export const UPDATE_KRONOS_WFD_ENDPOINT = 'UPDATE_KRONOS_WFD_ENDPOINT';
export const UPDATE_KRONOS_WFD_ENDPOINT_PENDING = `${UPDATE_KRONOS_WFD_ENDPOINT}_PENDING`;
export const UPDATE_KRONOS_WFD_ENDPOINT_FULFILLED = `${UPDATE_KRONOS_WFD_ENDPOINT}_FULFILLED`;
export const UPDATE_KRONOS_WFD_ENDPOINT_REJECTED = `${UPDATE_KRONOS_WFD_ENDPOINT}_REJECTED`;

export function updateWfdEndpoint(endpoint) {
  return {
    type: UPDATE_KRONOS_WFD_ENDPOINT,
    payload: http.post('kronos/endpoint/wfd/update', endpoint),
  };
}
