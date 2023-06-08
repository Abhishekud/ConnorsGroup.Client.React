import {http} from '../../shared/services';

export const DELETE_LOCATION = 'DELETE_LOCATION';
export const DELETE_LOCATION_PENDING = `${DELETE_LOCATION}_PENDING`;
export const DELETE_LOCATION_FULFILLED = `${DELETE_LOCATION}_FULFILLED`;
export const DELETE_LOCATION_REJECTED = `${DELETE_LOCATION}_REJECTED`;

export function deleteLocation(locationId) {
  return {
    type: DELETE_LOCATION,
    payload: http.delete(`locations/${locationId}`),
  };
}
