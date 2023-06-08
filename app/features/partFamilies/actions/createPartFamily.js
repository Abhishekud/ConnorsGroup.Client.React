import {http} from '../../shared/services';

export const CREATE_PART_FAMILY = 'CREATE_PART_FAMILY';
export const CREATE_PART_FAMILY_PENDING = `${CREATE_PART_FAMILY}_PENDING`;
export const CREATE_PART_FAMILY_FULFILLED = `${CREATE_PART_FAMILY}_FULFILLED`;
export const CREATE_PART_FAMILY_REJECTED = `${CREATE_PART_FAMILY}_REJECTED`;

export function createPartFamily(model) {
  return {
    type: CREATE_PART_FAMILY,
    payload: http.post('part-families', model),
  };
}
