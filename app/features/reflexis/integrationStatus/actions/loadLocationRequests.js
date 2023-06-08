import {http} from '../../../shared/services';

export const LOAD_LOCATION_REQUESTS = 'REFLEXIS/LOCATION/LOAD_LOCATION_REQUESTS';
export const LOAD_LOCATION_REQUESTS_PENDING = `${LOAD_LOCATION_REQUESTS}_PENDING`;
export const LOAD_LOCATION_REQUESTS_FULFILLED = `${LOAD_LOCATION_REQUESTS}_FULFILLED`;
export const LOAD_LOCATION_REQUESTS_REJECTED = `${LOAD_LOCATION_REQUESTS}_REJECTED`;

export function loadLocationRequests(id) {
  return {
    type: LOAD_LOCATION_REQUESTS,
    payload: http.get(`reflexis/locations/${id}/requests`),
  };
}
