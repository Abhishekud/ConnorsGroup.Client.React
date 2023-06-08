export const SHOW_DELETE_ROLE = 'SHOW_DELETE_ROLE';

export function showDeleteRole(role) {
  return {
    type: SHOW_DELETE_ROLE,
    payload: role,
  };
}
