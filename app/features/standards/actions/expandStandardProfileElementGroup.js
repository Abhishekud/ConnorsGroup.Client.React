export const EXPAND_STANDARD_PROFILE_ELEMENT_GROUP = 'EXPAND_STANDARD_PROFILE_ELEMENT_GROUP';

export function expandStandardProfileElementGroup(elementGroupId) {
  return {
    type: EXPAND_STANDARD_PROFILE_ELEMENT_GROUP,
    payload: {elementGroupId},
  };
}
