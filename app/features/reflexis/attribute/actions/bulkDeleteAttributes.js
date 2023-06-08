import {http} from '../../../shared/services';

export const DELETE_REFLEXIS_ATTRIBUTES = 'DELETE_REFLEXIS_ATTRIBUTES';
export const DELETE_REFLEXIS_ATTRIBUTES_PENDING = `${DELETE_REFLEXIS_ATTRIBUTES}_PENDING`;
export const DELETE_REFLEXIS_ATTRIBUTES_FULFILLED = `${DELETE_REFLEXIS_ATTRIBUTES}_FULFILLED`;
export const DELETE_REFLEXIS_ATTRIBUTES_REJECTED = `${DELETE_REFLEXIS_ATTRIBUTES}_REJECTED`;

export function bulkDeleteAttributes(ids) {

  return {
    type: DELETE_REFLEXIS_ATTRIBUTES,
    payload: http.post('reflexis/attributes/bulk-delete', {ids}),
  };
}
