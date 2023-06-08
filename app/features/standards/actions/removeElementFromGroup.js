import {http} from '../../shared/services';

export const REMOVE_STANDARD_ELEMENT_FROM_GROUP = 'REMOVE_STANDARD_ELEMENT_FROM_GROUP';
export const REMOVE_STANDARD_ELEMENT_FROM_GROUP_PENDING = `${REMOVE_STANDARD_ELEMENT_FROM_GROUP}_PENDING`;
export const REMOVE_STANDARD_ELEMENT_FROM_GROUP_FULFILLED = `${REMOVE_STANDARD_ELEMENT_FROM_GROUP}_FULFILLED`;
export const REMOVE_STANDARD_ELEMENT_FROM_GROUP_REJECTED = `${REMOVE_STANDARD_ELEMENT_FROM_GROUP}_REJECTED`;

export function removeStandardElementFromGroup(standardId, standardElementId) {
  return {
    type: REMOVE_STANDARD_ELEMENT_FROM_GROUP,
    payload: http.put(`standards/${standardId}/elements/${standardElementId}/remove-from-group`),
  };
}
