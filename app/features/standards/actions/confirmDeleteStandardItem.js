export const CONFIRM_DELETE_STANDARD_ITEM = 'CONFIRM_DELETE_STANDARD_ITEM';

export function confirmDeleteStandardItem(standardId, standardItem) {
  return {
    type: CONFIRM_DELETE_STANDARD_ITEM,
    payload: {
      standardId,
      standardItem,
    },
  };
}
