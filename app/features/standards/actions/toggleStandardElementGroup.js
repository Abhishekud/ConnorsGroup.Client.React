export const TOGGLE_STANDARD_ELEMENT_GROUP = 'TOGGLE_STANDARD_ELEMENT_GROUP';

export function toggleStandardElementGroup(standardElementGroupId) {
  return {
    type: TOGGLE_STANDARD_ELEMENT_GROUP,
    payload: standardElementGroupId,
  };
}
