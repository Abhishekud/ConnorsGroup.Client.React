import {http} from '../../shared/services';

export const UPDATE_LOCATION_PROFILE = 'UPDATE_LOCATION_PROFILE';
export const UPDATE_LOCATION_PROFILE_PENDING = `${UPDATE_LOCATION_PROFILE}_PENDING`;
export const UPDATE_LOCATION_PROFILE_FULFILLED = `${UPDATE_LOCATION_PROFILE}_FULFILLED`;
export const UPDATE_LOCATION_PROFILE_REJECTED = `${UPDATE_LOCATION_PROFILE}_REJECTED`;

export function updateLocationProfile(locationProfile) {
  return {
    type: UPDATE_LOCATION_PROFILE,
    payload: {
      promise: http.put(`location-profiles/${locationProfile.get('id')}`, locationProfile),
      data: locationProfile.get('id'),
    },
  };
}
