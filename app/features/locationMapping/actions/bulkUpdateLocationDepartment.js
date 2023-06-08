import {http} from '../../shared/services';

export const BULK_UPDATE_LOCATION_DEPARTMENT = 'BULK_UPDATE_LOCATION_DEPARTMENT';
export const BULK_UPDATE_LOCATION_DEPARTMENT_PENDING = `${BULK_UPDATE_LOCATION_DEPARTMENT}_PENDING`;
export const BULK_UPDATE_LOCATION_DEPARTMENT_FULFILLED = `${BULK_UPDATE_LOCATION_DEPARTMENT}_FULFILLED`;
export const BULK_UPDATE_LOCATION_DEPARTMENT_REJECTED = `${BULK_UPDATE_LOCATION_DEPARTMENT}_REJECTED`;

export function bulkUpdateLocationDepartment(locations) {
  return {
    type: BULK_UPDATE_LOCATION_DEPARTMENT,
    payload: http.put('locations/bulk-update-location-department', locations),
  };
}
