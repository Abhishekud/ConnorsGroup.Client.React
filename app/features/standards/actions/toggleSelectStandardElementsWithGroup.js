export const TOGGLE_SELECT_STANDARD_ELEMENTS_WITH_GROUP = 'TOGGLE_SELECT_STANDARD_ELEMENTS_WITH_GROUP';

export function toggleSelectStandardElementsWithGroup(ids, selected, standardElementGroupId) {
  return {
    type: TOGGLE_SELECT_STANDARD_ELEMENTS_WITH_GROUP,
    payload: {ids, selected, standardElementGroupId},
  };
}
