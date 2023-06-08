import {http} from '../../shared/services';

export const BULK_DELETE_LOCATION = 'BULK_DELETE_LOCATION';
export const BULK_DELETE_LOCATION_PENDING = `${BULK_DELETE_LOCATION}_PENDING`;
export const BULK_DELETE_LOCATION_FULFILLED = `${BULK_DELETE_LOCATION}_FULFILLED`;
export const BULK_DELETE_LOCATION_REJECTED = `${BULK_DELETE_LOCATION}_REJECTED`;

export function bulkDeleteLocation(locationIds, filters, allLocations) {
  const model = {locationIds, filters, allLocations};
  return {
    type: BULK_DELETE_LOCATION,
    payload: http.post('locations/bulk-delete-location', model),
  };
}
