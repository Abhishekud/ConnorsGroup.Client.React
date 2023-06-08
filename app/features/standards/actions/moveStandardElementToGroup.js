import {http} from '../../shared/services';

export const MOVE_STANDARD_ELEMENT_TO_GROUP = 'MOVE_STANDARD_ELEMENT_TO_GROUP';
export const MOVE_STANDARD_ELEMENT_TO_GROUP_PENDING = `${MOVE_STANDARD_ELEMENT_TO_GROUP}_PENDING`;
export const MOVE_STANDARD_ELEMENT_TO_GROUP_FULFILLED = `${MOVE_STANDARD_ELEMENT_TO_GROUP}_FULFILLED`;
export const MOVE_STANDARD_ELEMENT_TO_GROUP_REJECTED = `${MOVE_STANDARD_ELEMENT_TO_GROUP}_REJECTED`;

export function moveStandardElementToGroup(standardId, standardElementId, standardElementGroupId) {
  return {
    type: MOVE_STANDARD_ELEMENT_TO_GROUP,
    payload: http.put(`standards/${standardId}/elements/${standardElementId}/move-to-group`, {standardElementGroupId}),
  };
}
