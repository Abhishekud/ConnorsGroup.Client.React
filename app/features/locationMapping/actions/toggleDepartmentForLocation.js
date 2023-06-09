import {http} from '../../shared/services';

export const TOGGLE_DEPARTMENT_FOR_LOCATION = 'TOGGLE_DEPARTMENT_FOR_LOCATION';
export const TOGGLE_DEPARTMENT_FOR_LOCATION_PENDING = `${TOGGLE_DEPARTMENT_FOR_LOCATION}_PENDING`;
export const TOGGLE_DEPARTMENT_FOR_LOCATION_FULFILLED = `${TOGGLE_DEPARTMENT_FOR_LOCATION}_FULFILLED`;
export const TOGGLE_DEPARTMENT_FOR_LOCATION_REJECTED = `${TOGGLE_DEPARTMENT_FOR_LOCATION}_REJECTED`;

export const TOGGLE_DEPARTMENT_FOR_LOCATION_BULK = 'TOGGLE_DEPARTMENT_FOR_LOCATION_BULK';
export const TOGGLE_DEPARTMENT_FOR_LOCATION_BULK_PENDING = `${TOGGLE_DEPARTMENT_FOR_LOCATION_BULK}_PENDING`;
export const TOGGLE_DEPARTMENT_FOR_LOCATION_BULK_FULFILLED = `${TOGGLE_DEPARTMENT_FOR_LOCATION_BULK}_FULFILLED`;
export const TOGGLE_DEPARTMENT_FOR_LOCATION_BULK_REJECTED = `${TOGGLE_DEPARTMENT_FOR_LOCATION_BULK}_REJECTED`;

export function toggleDepartmentForLocation(locations, departmentId) {
  return {
    type: locations.length >= 20 ? TOGGLE_DEPARTMENT_FOR_LOCATION_BULK : TOGGLE_DEPARTMENT_FOR_LOCATION,
    payload: http.put('locations/update-department', {locations, departmentId}),
  };
}
