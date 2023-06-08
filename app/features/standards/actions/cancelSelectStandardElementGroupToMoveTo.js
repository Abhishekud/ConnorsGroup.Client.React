export const CANCEL_SELECT_STANDARD_ELEMENT_GROUP_TO_MOVE_TO = 'CANCEL_SELECT_STANDARD_ELEMENT_GROUP_TO_MOVE_TO';

export function cancelSelectStandardElementGroupToMoveTo(standardId, standardElementId) {
  return {
    type: CANCEL_SELECT_STANDARD_ELEMENT_GROUP_TO_MOVE_TO,
    payload: {
      standardId,
      standardElementId,
    },
  };
}
