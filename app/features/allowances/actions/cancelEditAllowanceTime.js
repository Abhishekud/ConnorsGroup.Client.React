export const CANCEL_EDIT_ALLOWANCE_TIME = 'CANCEL_EDIT_ALLOWANCE_TIME';

export function cancelEditAllowanceTime(id) {
  return {
    type: CANCEL_EDIT_ALLOWANCE_TIME,
    payload: id,
  };
}
