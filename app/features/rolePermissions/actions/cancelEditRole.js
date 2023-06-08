export const CANCEL_EDIT_ROLE = 'CANCEL_EDIT_ROLE';

export function cancelEditRole(id) {
  return {
    type: CANCEL_EDIT_ROLE,
    payload: id,
  };
}
