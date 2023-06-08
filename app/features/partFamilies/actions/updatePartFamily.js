import {http} from '../../shared/services';

export const UPDATE_PART_FAMILY = 'UPDATE_PART_FAMILY';
export const UPDATE_PART_FAMILY_PENDING = `${UPDATE_PART_FAMILY}_PENDING`;
export const UPDATE_PART_FAMILY_FULFILLED = `${UPDATE_PART_FAMILY}_FULFILLED`;
export const UPDATE_PART_FAMILY_REJECTED = `${UPDATE_PART_FAMILY}_REJECTED`;

export function updatePartFamily(partFamily) {
  return {
    type: UPDATE_PART_FAMILY,
    payload: http.put(`part-families/${partFamily.get('id')}`, partFamily),
  };
}
