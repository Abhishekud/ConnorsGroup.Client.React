import {http} from '../../../shared/services';

export const CREATE_KRONOS_WFD_ENDPOINT = 'CREATE_KRONOS_WFD_ENDPOINT';
export const CREATE_KRONOS_WFD_ENDPOINT_PENDING = `${CREATE_KRONOS_WFD_ENDPOINT}_PENDING`;
export const CREATE_KRONOS_WFD_ENDPOINT_FULFILLED = `${CREATE_KRONOS_WFD_ENDPOINT}_FULFILLED`;
export const CREATE_KRONOS_WFD_ENDPOINT_REJECTED = `${CREATE_KRONOS_WFD_ENDPOINT}_REJECTED`;

export function createWfdEndpoint(endpoint) {
  return {
    type: CREATE_KRONOS_WFD_ENDPOINT,
    payload: http.post('kronos/endpoint/wfd', endpoint),
  };
}
