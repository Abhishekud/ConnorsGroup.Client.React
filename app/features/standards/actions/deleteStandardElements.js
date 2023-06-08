import {http} from '../../shared/services';

export const DELETE_STANDARD_ELEMENTS = 'DELETE_STANDARD_ELEMENTS';
export const DELETE_STANDARD_ELEMENTS_PENDING = `${DELETE_STANDARD_ELEMENTS}_PENDING`;
export const DELETE_STANDARD_ELEMENTS_FULFILLED = `${DELETE_STANDARD_ELEMENTS}_FULFILLED`;
export const DELETE_STANDARD_ELEMENTS_REJECTED = `${DELETE_STANDARD_ELEMENTS}_REJECTED`;

export function deleteStandardElements(standardId, standardElementIds) {
  const model = {standardElementIds};
  return {
    type: DELETE_STANDARD_ELEMENTS,
    payload: http.post(`standards/${standardId}/elements/delete`, model),
  };
}
