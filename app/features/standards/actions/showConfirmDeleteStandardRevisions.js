export const SHOW_CONFIRM_DELETE_STANDARD_REVISIONS = 'SHOW_CONFIRM_DELETE_STANDARD_REVISIONS';

export function showConfirmDeleteStandardRevisions(standardRevisions, standardId) {
  return {
    type: SHOW_CONFIRM_DELETE_STANDARD_REVISIONS,
    payload: {standardRevisions, standardId},
  };
}
