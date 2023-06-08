export const SELECT_ALL_STANDARD_REVISIONS = 'SELECT_ALL_STANDARD_REVISIONS';

export function selectAllStandardRevisions(ids, selected) {
  return {
    type: SELECT_ALL_STANDARD_REVISIONS,
    payload: {ids, selected},
  };
}
