import {http} from '../../shared/services';

export const PROMOTE_TO_LIST_ELEMENT = 'PROMOTE_TO_LIST_ELEMENT';
export const PROMOTE_TO_LIST_ELEMENT_PENDING = `${PROMOTE_TO_LIST_ELEMENT}_PENDING`;
export const PROMOTE_TO_LIST_ELEMENT_FULFILLED = `${PROMOTE_TO_LIST_ELEMENT}_FULFILLED`;
export const PROMOTE_TO_LIST_ELEMENT_REJECTED = `${PROMOTE_TO_LIST_ELEMENT}_REJECTED`;

export function promoteToListElement(standardId, standardElementId, model) {
  return {
    type: PROMOTE_TO_LIST_ELEMENT,
    payload: http.put(`standards/${standardId}/elements/${standardElementId}/promote-to-list`, model),
  };
}
