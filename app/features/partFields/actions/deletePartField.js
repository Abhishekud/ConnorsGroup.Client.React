import {http} from '../../shared/services';

export const DELETE_PART_FIELD = 'DELETE_PART_FIELD';
export const DELETE_PART_FIELD_PENDING = `${DELETE_PART_FIELD}_PENDING`;
export const DELETE_PART_FIELD_FULFILLED = `${DELETE_PART_FIELD}_FULFILLED`;
export const DELETE_PART_FIELD_REJECTED = `${DELETE_PART_FIELD}_REJECTED`;

export function deletePartField(id) {
  return {
    type: DELETE_PART_FIELD,
    payload: http.delete(`part-fields/${id}`),
  };
}
