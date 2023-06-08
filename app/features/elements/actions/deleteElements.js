import {http} from '../../shared/services';

export const DELETE_ELEMENTS = 'DELETE_ELEMENTS';
export const DELETE_ELEMENTS_PENDING = `${DELETE_ELEMENTS}_PENDING`;
export const DELETE_ELEMENTS_FULFILLED = `${DELETE_ELEMENTS}_FULFILLED`;
export const DELETE_ELEMENTS_REJECTED = `${DELETE_ELEMENTS}_REJECTED`;

export function deleteElements(elementIds) {
  const model = {elementIds};
  return {
    type: DELETE_ELEMENTS,
    payload: http.post('elements/delete', model),
  };
}
