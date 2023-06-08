import {http} from '../../../shared/services';

export const LOAD_ATTRIBUTE_REQUESTS = 'REFLEXIS/ATTRIBUTE/LOAD_ATTRIBUTE_REQUESTS';
export const LOAD_ATTRIBUTE_REQUESTS_PENDING = `${LOAD_ATTRIBUTE_REQUESTS}_PENDING`;
export const LOAD_ATTRIBUTE_REQUESTS_FULFILLED = `${LOAD_ATTRIBUTE_REQUESTS}_FULFILLED`;
export const LOAD_ATTRIBUTE_REQUESTS_REJECTED = `${LOAD_ATTRIBUTE_REQUESTS}_REJECTED`;

export function loadAttributeRequests(id) {
  return {
    type: LOAD_ATTRIBUTE_REQUESTS,
    payload: http.get(`reflexis/attributes/${id}/requests`),
  };
}
