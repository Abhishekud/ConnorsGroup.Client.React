import {http} from '../../shared/services';

export const CREATE_STANDARD_ELEMENT = 'CREATE_STANDARD_ELEMENT';
export const CREATE_STANDARD_ELEMENT_REJECTED = `${CREATE_STANDARD_ELEMENT}_REJECTED`;
export const CREATE_STANDARD_ELEMENT_PENDING = `${CREATE_STANDARD_ELEMENT}_PENDING`;
export const CREATE_STANDARD_ELEMENT_FULFILLED = `${CREATE_STANDARD_ELEMENT}_FULFILLED`;

export function createStandardElement(standardId, model) {
  return {
    type: CREATE_STANDARD_ELEMENT,
    payload: http.post(`standards/${standardId}/elements/create`, model),
  };
}
