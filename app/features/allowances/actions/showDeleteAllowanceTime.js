export const SHOW_DELETE_ALLOWANCE_TIME = 'SHOW_DELETE_ALLOWANCE_TIME';

export function showDeleteAllowanceTime(allowanceTime) {
  return {
    type: SHOW_DELETE_ALLOWANCE_TIME,
    payload: allowanceTime,
  };
}
