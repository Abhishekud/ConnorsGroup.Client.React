import {http} from '../../shared/services';

export const MASS_UPDATE_REPLACE_ELEMENT = 'MASS_UPDATE_REPLACE_ELEMENT';
export const MASS_UPDATE_REPLACE_ELEMENT_PENDING = `${MASS_UPDATE_REPLACE_ELEMENT}_PENDING`;
export const MASS_UPDATE_REPLACE_ELEMENT_FULFILLED = `${MASS_UPDATE_REPLACE_ELEMENT}_FULFILLED`;
export const MASS_UPDATE_REPLACE_ELEMENT_REJECTED = `${MASS_UPDATE_REPLACE_ELEMENT}_REJECTED`;

export function massUpdateReplaceElement(id, model) {
  return {
    type: MASS_UPDATE_REPLACE_ELEMENT,
    payload: http.post(`elements/${id}/replace-in-standards`, model),
  };
}
