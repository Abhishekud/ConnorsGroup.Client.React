import {http} from '../../shared/services';

export const DELETE_PART = 'DELETE_PART';
export const DELETE_PART_PENDING = `${DELETE_PART}_PENDING`;
export const DELETE_PART_FULFILLED = `${DELETE_PART}_FULFILLED`;
export const DELETE_PART_REJECTED = `${DELETE_PART}_REJECTED`;

export function deletePart(partFamilyId, partId) {
  return {
    type: DELETE_PART,
    payload: http.delete(`part-families/${partFamilyId}/parts/${partId}`),
  };
}
