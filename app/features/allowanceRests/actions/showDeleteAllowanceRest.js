export const SHOW_DELETE_ALLOWANCE_REST = 'SHOW_DELETE_ALLOWANCE_REST';

export function showDeleteAllowanceRest(allowanceRest) {
  return {
    type: SHOW_DELETE_ALLOWANCE_REST,
    payload: allowanceRest,
  };
}
