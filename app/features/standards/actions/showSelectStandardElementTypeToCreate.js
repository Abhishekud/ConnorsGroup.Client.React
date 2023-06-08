export const SHOW_SELECT_STANDARD_ELEMENT_TYPE_TO_CREATE = 'SHOW_SELECT_STANDARD_ELEMENT_TYPE_TO_CREATE';

export function showSelectStandardElementTypeToCreate(insertAtIndex, elementGroupId) {
  return {
    type: SHOW_SELECT_STANDARD_ELEMENT_TYPE_TO_CREATE,
    payload: {
      insertAtIndex,
      elementGroupId,
    },
  };
}
