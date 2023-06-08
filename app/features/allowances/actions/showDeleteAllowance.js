export const SHOW_DELETE_ALLOWANCE = 'SHOW_DELETE_ALLOWANCE';

export function showDeleteAllowance(allowance) {
  return {
    type: SHOW_DELETE_ALLOWANCE,
    payload: allowance,
  };
}
