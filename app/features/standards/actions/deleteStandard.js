import {http} from '../../shared/services';

export const DELETE_STANDARD = 'DELETE_STANDARD';
export const DELETE_STANDARD_PENDING = `${DELETE_STANDARD}_PENDING`;
export const DELETE_STANDARD_FULFILLED = `${DELETE_STANDARD}_FULFILLED`;
export const DELETE_STANDARD_REJECTED = `${DELETE_STANDARD}_REJECTED`;

export function deleteStandard(standardId) {
  return {
    type: DELETE_STANDARD,
    payload: http.delete(`standards/${standardId}`),
  };
}
