export const SHOW_MOVE_STANDARD_ITEM_TO_POSITION = 'SHOW_MOVE_STANDARD_ITEM_TO_POSITION';

export function showMoveStandardItemToPosition(standardId, standardItemId) {
  return {
    type: SHOW_MOVE_STANDARD_ITEM_TO_POSITION,
    payload: {standardId, standardItemId},
  };
}
