export const EDIT_ROLE = 'EDIT_ROLE';

export function editRole(id) {
  return {
    type: EDIT_ROLE,
    payload: id,
  };
}
