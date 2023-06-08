export const CANCEL_EDIT_STANDARD_ELEMENT_GROUP = 'CANCEL_EDIT_STANDARD_ELEMENT_GROUP';

export function cancelEditStandardElementGroup(standardElementGroupId) {
  return {
    type: CANCEL_EDIT_STANDARD_ELEMENT_GROUP,
    payload: standardElementGroupId,
  };
}
