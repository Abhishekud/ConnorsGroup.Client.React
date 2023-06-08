import {http} from '../../shared/services';

export const LOAD_LOCATION_PROFILES = 'LOAD_LOCATION_PROFILES';
export const LOAD_LOCATION_PROFILES_PENDING = `${LOAD_LOCATION_PROFILES}_PENDING`;
export const LOAD_LOCATION_PROFILES_FULFILLED = `${LOAD_LOCATION_PROFILES}_FULFILLED`;
export const LOAD_LOCATION_PROFILES_REJECTED = `${LOAD_LOCATION_PROFILES}_REJECTED`;

export function loadLocationProfilesList() {
  return {
    type: LOAD_LOCATION_PROFILES,
    payload: http.get('location-profiles/list'),
  };
}
