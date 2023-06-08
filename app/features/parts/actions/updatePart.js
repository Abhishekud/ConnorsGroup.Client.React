import {http} from '../../shared/services';

export const UPDATE_PART = 'UPDATE_PART';
export const UPDATE_PART_PENDING = `${UPDATE_PART}_PENDING`;
export const UPDATE_PART_FULFILLED = `${UPDATE_PART}_FULFILLED`;
export const UPDATE_PART_REJECTED = `${UPDATE_PART}_REJECTED`;

export function updatePart(partFamilyId, part) {
  return {
    type: UPDATE_PART,
    payload: http.put(`part-families/${partFamilyId}/parts/${part.get('id')}`, part),
  };
}
