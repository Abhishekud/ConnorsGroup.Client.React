import {http} from '../../shared/services';

export const UPDATE_LOCATION_MAPPING = 'UPDATE_LOCATION_MAPPING';
export const UPDATE_LOCATION_MAPPING_PENDING = `${UPDATE_LOCATION_MAPPING}_PENDING`;
export const UPDATE_LOCATION_MAPPING_FULFILLED = `${UPDATE_LOCATION_MAPPING}_FULFILLED`;
export const UPDATE_LOCATION_MAPPING_REJECTED = `${UPDATE_LOCATION_MAPPING}_REJECTED`;

export function updateLocationMapping(locationId, locationMapping) {
  return {
    type: UPDATE_LOCATION_MAPPING,
    payload: http.put(`locations/${locationId}/department`, locationMapping),
  };
}
