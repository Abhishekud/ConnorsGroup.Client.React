import {http} from '../../../shared/services';

export const DELETE_REFLEXIS_ATTRIBUTE = 'DELETE_REFLEXIS_ATTRIBUTE';
export const DELETE_REFLEXIS_ATTRIBUTE_PENDING = `${DELETE_REFLEXIS_ATTRIBUTE}_PENDING`;
export const DELETE_REFLEXIS_ATTRIBUTE_FULFILLED = `${DELETE_REFLEXIS_ATTRIBUTE}_FULFILLED`;
export const DELETE_REFLEXIS_ATTRIBUTE_REJECTED = `${DELETE_REFLEXIS_ATTRIBUTE}_REJECTED`;

export function deleteAttribute(id) {

  return {
    type: DELETE_REFLEXIS_ATTRIBUTE,
    payload: http.delete(`reflexis/attributes/${id}`),
  };
}


