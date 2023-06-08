export const TOGGLE_SELECT_STANDARD_REVISION = 'TOGGLE_SELECT_STANDARD_REVISION';

export function toggleSelectStandardRevision(id) {
  return {
    type: TOGGLE_SELECT_STANDARD_REVISION,
    payload: {id},
  };
}
