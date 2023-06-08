import {http} from '../../shared/services';

export const IMPORT_LOCATION_PROFILES = 'IMPORT_LOCATION_PROFILES';
export const IMPORT_LOCATION_PROFILES_PENDING = `${IMPORT_LOCATION_PROFILES}_PENDING`;
export const IMPORT_LOCATION_PROFILES_FULFILLED = `${IMPORT_LOCATION_PROFILES}_FULFILLED`;
export const IMPORT_LOCATION_PROFILES_REJECTED = `${IMPORT_LOCATION_PROFILES}_REJECTED`;

export function importLocationProfiles(file) {
  const data = new FormData();
  data.append('file', file);

  return {
    type: IMPORT_LOCATION_PROFILES,
    payload: http.post('location-profiles/import', data),
  };
}
