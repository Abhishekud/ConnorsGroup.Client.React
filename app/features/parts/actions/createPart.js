import {http} from '../../shared/services';

export const CREATE_PART = 'CREATE_PART';
export const CREATE_PART_PENDING = `${CREATE_PART}_PENDING`;
export const CREATE_PART_FULFILLED = `${CREATE_PART}_FULFILLED`;
export const CREATE_PART_REJECTED = `${CREATE_PART}_REJECTED`;

export function createPart(partFamilyId, model) {
  return {
    type: CREATE_PART,
    payload: http.post(`part-families/${partFamilyId}/parts`, model),
  };
}
