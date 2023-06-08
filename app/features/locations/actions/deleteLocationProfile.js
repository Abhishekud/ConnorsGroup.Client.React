import {http} from '../../shared/services';

export const DELETE_LOCATION_PROFILE = 'DELETE_LOCATION_PROFILE';
export const DELETE_LOCATION_PROFILE_PENDING = `${DELETE_LOCATION_PROFILE}_PENDING`;
export const DELETE_LOCATION_PROFILE_FULFILLED = `${DELETE_LOCATION_PROFILE}_FULFILLED`;
export const DELETE_LOCATION_PROFILE_REJECTED = `${DELETE_LOCATION_PROFILE}_REJECTED`;

export function deleteLocationProfile(locationProfileId) {
  return {
    type: DELETE_LOCATION_PROFILE,
    payload: http.delete(`location-profiles/${locationProfileId}`),
  };
}
