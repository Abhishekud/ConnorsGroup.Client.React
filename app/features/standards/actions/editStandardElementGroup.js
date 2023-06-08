export const EDIT_STANDARD_ELEMENT_GROUP = 'EDIT_STANDARD_ELEMENT_GROUP';

export function editStandardElementGroup(standardElementGroupId) {
  return {
    type: EDIT_STANDARD_ELEMENT_GROUP,
    payload: standardElementGroupId,
  };
}
