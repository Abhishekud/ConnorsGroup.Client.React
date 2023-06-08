export const SHOW_CONFIRM_BULK_DELETE_STANDARDS_REVISIONS = 'SHOW_CONFIRM_BULK_DELETE_STANDARDS_REVISIONS';

export function showConfirmBulkDeleteStandardsRevisions(standardIds) {
  return {
    type: SHOW_CONFIRM_BULK_DELETE_STANDARDS_REVISIONS,
    payload: {standardIds},
  };
}
