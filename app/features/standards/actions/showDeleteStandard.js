export const SHOW_DELETE_STANDARD = 'SHOW_DELETE_STANDARD';

export function showDeleteStandard(standard) {
  return {
    type: SHOW_DELETE_STANDARD,
    payload: standard,
  };
}
