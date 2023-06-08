import {http} from '../../shared/services';

export const CREATE_PART_FIELD = 'CREATE_PART_FIELD';
export const CREATE_PART_FIELD_PENDING = `${CREATE_PART_FIELD}_PENDING`;
export const CREATE_PART_FIELD_FULFILLED = `${CREATE_PART_FIELD}_FULFILLED`;
export const CREATE_PART_FIELD_REJECTED = `${CREATE_PART_FIELD}_REJECTED`;

export function createPartField(model) {
  return {
    type: CREATE_PART_FIELD,
    payload: http.post('part-fields', model),
  };
}
