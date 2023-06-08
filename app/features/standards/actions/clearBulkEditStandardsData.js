export const CLEAR_BULK_EDIT_STANDARDS_DATA = 'CLEAR_BULK_EDIT_STANDARDS_DATA';

export function clearBulkEditStandardsData(standard) {
  return {
    type: CLEAR_BULK_EDIT_STANDARDS_DATA,
    payload: standard,
  };
}
