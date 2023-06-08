import {http} from '../../shared/services';

export const UPDATE_STANDARD_ELEMENT_GROUP = 'SAVE_STANDARD_ELEMENTS_AND_GROUP';
export const UPDATE_STANDARD_ELEMENT_GROUP_PENDING = `${UPDATE_STANDARD_ELEMENT_GROUP}_PENDING`;
export const UPDATE_STANDARD_ELEMENT_GROUP_FULFILLED = `${UPDATE_STANDARD_ELEMENT_GROUP}_FULFILLED`;
export const UPDATE_STANDARD_ELEMENT_GROUP_REJECTED = `${UPDATE_STANDARD_ELEMENT_GROUP}_REJECTED`;

export function updateStandardElementGroup(standardId, standardElements, standardElementGroup, timeFormat) {
  return {
    type: UPDATE_STANDARD_ELEMENT_GROUP,
    payload: http.put(`standards/${standardId}/element-groups/${standardElementGroup.get('id')}`, {
      name: standardElementGroup.get('name'),
      standardElements: standardElements.valueSeq().toArray(),
      timeFormat,
    }),
  };
}
