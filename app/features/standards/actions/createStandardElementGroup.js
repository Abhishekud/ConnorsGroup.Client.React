import {http} from '../../shared/services';

export const CREATE_STANDARD_ELEMENT_GROUP = 'ADD_STANDARD_GROUP';
export const CREATE_STANDARD_ELEMENT_GROUP_REJECTED = `${CREATE_STANDARD_ELEMENT_GROUP}_REJECTED`;
export const CREATE_STANDARD_ELEMENT_GROUP_PENDING = `${CREATE_STANDARD_ELEMENT_GROUP}_PENDING`;
export const CREATE_STANDARD_ELEMENT_GROUP_FULFILLED = `${CREATE_STANDARD_ELEMENT_GROUP}_FULFILLED`;

export function createStandardElementGroup(standardId, name, insertAtIndex) {
  return {
    type: CREATE_STANDARD_ELEMENT_GROUP,
    payload: http.post(`standards/${standardId}/element-groups`, {name, insertAtIndex}),
  };
}
