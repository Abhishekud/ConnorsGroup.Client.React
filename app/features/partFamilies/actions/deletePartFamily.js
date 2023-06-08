import {http} from '../../shared/services';

export const DELETE_PART_FAMILY = 'DELETE_PART_FAMILY';
export const DELETE_PART_FAMILY_PENDING = `${DELETE_PART_FAMILY}_PENDING`;
export const DELETE_PART_FAMILY_FULFILLED = `${DELETE_PART_FAMILY}_FULFILLED`;
export const DELETE_PART_FAMILY_REJECTED = `${DELETE_PART_FAMILY}_REJECTED`;

export function deletePartFamily(partFamilyId) {
  return {
    type: DELETE_PART_FAMILY,
    payload: http.delete(`part-families/${partFamilyId}`),
  };
}
