import {http} from '../../shared/services';

export const UPDATE_PART_FIELD = 'UPDATE_PART_FIELD';
export const UPDATE_PART_FIELD_PENDING = `${UPDATE_PART_FIELD}_PENDING`;
export const UPDATE_PART_FIELD_FULFILLED = `${UPDATE_PART_FIELD}_FULFILLED`;
export const UPDATE_PART_FIELD_REJECTED = `${UPDATE_PART_FIELD}_REJECTED`;

export function updatePartField(model) {
  return {
    type: UPDATE_PART_FIELD,
    payload: http.put(`part-fields/${model.get('id')}`, model),
  };
}
