import {http} from '../../shared/services';

export const UPDATE_MOST_ELEMENT = 'UPDATE_MOST_ELEMENT';
export const UPDATE_MOST_ELEMENT_PENDING = `${UPDATE_MOST_ELEMENT}_PENDING`;
export const UPDATE_MOST_ELEMENT_FULFILLED = `${UPDATE_MOST_ELEMENT}_FULFILLED`;
export const UPDATE_MOST_ELEMENT_REJECTED = `${UPDATE_MOST_ELEMENT}_REJECTED`;

export function updateMOSTElement(model) {
  return {
    type: UPDATE_MOST_ELEMENT,
    payload: http.put(`elements/most/${model.get('id')}`, model),
  };
}
