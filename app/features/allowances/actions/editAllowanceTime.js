export const EDIT_ALLOWANCE_TIME = 'EDIT_ALLOWANCE_TIME';

export function editAllowanceTime(id) {
  return {
    type: EDIT_ALLOWANCE_TIME,
    payload: id,
  };
}
