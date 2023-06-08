import {http} from '../../shared/services';

export const DELETE_ELEMENT = 'DELETE_ELEMENT';
export const DELETE_ELEMENT_PENDING = `${DELETE_ELEMENT}_PENDING`;
export const DELETE_ELEMENT_FULFILLED = `${DELETE_ELEMENT}_FULFILLED`;
export const DELETE_ELEMENT_REJECTED = `${DELETE_ELEMENT}_REJECTED`;

export function deleteElement(id) {
  return {
    type: DELETE_ELEMENT,
    payload: http.delete(`elements/${id}`),
    data: id,
  };
}
