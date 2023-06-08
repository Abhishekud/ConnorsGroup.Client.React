import {http} from '../../shared/services';

export const DUPLICATE_ELEMENT = 'DUPLICATE_ELEMENT';
export const DUPLICATE_ELEMENT_PENDING = `${DUPLICATE_ELEMENT}_PENDING`;
export const DUPLICATE_ELEMENT_FULFILLED = `${DUPLICATE_ELEMENT}_FULFILLED`;
export const DUPLICATE_ELEMENT_REJECTED = `${DUPLICATE_ELEMENT}_REJECTED`;

export function duplicateElement(model) {
  return {
    type: DUPLICATE_ELEMENT,
    payload: http.post(`elements/${model.get('id')}/copy`, model),
  };
}
