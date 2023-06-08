import {http} from '../../shared/services';

export const CREATE_LOCATION = 'CREATE_LOCATION';
export const CREATE_LOCATION_PENDING = `${CREATE_LOCATION}_PENDING`;
export const CREATE_LOCATION_FULFILLED = `${CREATE_LOCATION}_FULFILLED`;
export const CREATE_LOCATION_REJECTED = `${CREATE_LOCATION}_REJECTED`;

export function createLocation(model) {
  return {
    type: CREATE_LOCATION,
    payload: http.post('locations', model),
  };
}
