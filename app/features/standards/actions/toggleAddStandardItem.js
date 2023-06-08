export const TOGGLE_ADD_STANDARD_ITEM = 'TOGGLE_ADD_STANDARD_ITEM';

export function toggleAddStandardItem(standardItemId, position) {
  return {
    type: TOGGLE_ADD_STANDARD_ITEM,
    payload: {standardItemId, position},
  };
}
