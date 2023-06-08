import {http} from '../../shared/services';

export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const UPDATE_LOCATION_PENDING = `${UPDATE_LOCATION}_PENDING`;
export const UPDATE_LOCATION_FULFILLED = `${UPDATE_LOCATION}_FULFILLED`;
export const UPDATE_LOCATION_REJECTED = `${UPDATE_LOCATION}_REJECTED`;

export function updateLocation(location) {
  return {
    type: UPDATE_LOCATION,
    payload: http.put(`locations/${location.get('id')}`, location),
  };
}
