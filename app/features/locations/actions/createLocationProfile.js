import {http} from '../../shared/services';

export const CREATE_LOCATION_PROFILE = 'CREATE_LOCATION_PROFILE';
export const CREATE_LOCATION_PROFILE_PENDING = `${CREATE_LOCATION_PROFILE}_PENDING`;
export const CREATE_LOCATION_PROFILE_FULFILLED = `${CREATE_LOCATION_PROFILE}_FULFILLED`;
export const CREATE_LOCATION_PROFILE_REJECTED = `${CREATE_LOCATION_PROFILE}_REJECTED`;

export function createLocationProfile(model) {
  return {
    type: CREATE_LOCATION_PROFILE,
    payload: http.post('location-profiles', model),
  };
}
