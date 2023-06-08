export const SHOW_CREATE_ROLE = 'SHOW_CREATE_ROLE';

export function showCreateRole() {
  return {
    type: SHOW_CREATE_ROLE,
    payload: {},
  };
}
