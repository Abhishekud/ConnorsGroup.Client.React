export const SHOW_CONFIRM_BULK_DELETE_SELECTED_STANDARD_ITEMS = 'SHOW_CONFIRM_BULK_DELETE_SELECTED_STANDARD_ITEMS';

export function showConfirmBulkDeleteSelectedStandardItems(standardData) {
  return {
    type: SHOW_CONFIRM_BULK_DELETE_SELECTED_STANDARD_ITEMS,
    payload: standardData,
  };
}
