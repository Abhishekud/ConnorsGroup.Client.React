export const SHOW_SELECT_STANDARD_ELEMENT_GROUP_TO_MOVE_TO = 'SHOW_SELECT_STANDARD_ELEMENT_GROUP_TO_MOVE_TO';

export function showSelectStandardElementGroupToMoveTo(standardId, standardElementId) {
  return {
    type: SHOW_SELECT_STANDARD_ELEMENT_GROUP_TO_MOVE_TO,
    payload: {
      standardId,
      standardElementId,
    },
  };
}
