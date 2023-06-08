import {http} from '../../shared/services';

export const DELETE_ATTRIBUTE = 'DELETE_ATTRIBUTE';
export const DELETE_ATTRIBUTE_PENDING = `${DELETE_ATTRIBUTE}_PENDING`;
export const DELETE_ATTRIBUTE_FULFILLED = `${DELETE_ATTRIBUTE}_FULFILLED`;
export const DELETE_ATTRIBUTE_REJECTED = `${DELETE_ATTRIBUTE}_REJECTED`;

export function deleteAttribute(attributeId) {
  return {
    type: DELETE_ATTRIBUTE,
    payload: http.delete(`attributes/${attributeId}`),
  };
}
