import {http} from '../../shared/services';

export const BULK_UPDATE_LOCATION = 'BULK_UPDATE_CHARACTERISTIC';
export const BULK_UPDATE_LOCATION_PENDING = `${BULK_UPDATE_LOCATION}_PENDING`;
export const BULK_UPDATE_LOCATION_FULFILLED = `${BULK_UPDATE_LOCATION}_FULFILLED`;
export const BULK_UPDATE_LOCATION_REJECTED = `${BULK_UPDATE_LOCATION}_REJECTED`;

export function bulkUpdateLocation(location) {
  return {
    type: BULK_UPDATE_LOCATION,
    payload: http.put('locations/bulk-update-location', location),
  };
}
