import {http} from '../../shared/services';

export const DELETE_STANDARD_ELEMENT_GROUP = 'DELETE_STANDARD_ELEMENT_GROUP';
export const DELETE_STANDARD_ELEMENT_GROUP_PENDING = `${DELETE_STANDARD_ELEMENT_GROUP}_PENDING`;
export const DELETE_STANDARD_ELEMENT_GROUP_FULFILLED = `${DELETE_STANDARD_ELEMENT_GROUP}_FULFILLED`;
export const DELETE_STANDARD_ELEMENT_GROUP_REJECTED = `${DELETE_STANDARD_ELEMENT_GROUP}_REJECTED`;

export function deleteStandardElementGroup(standardId, standardElementGroupId) {
  return {
    type: DELETE_STANDARD_ELEMENT_GROUP,
    payload: http.delete(`standards/${standardId}/element-groups/${standardElementGroupId}`),
  };
}
