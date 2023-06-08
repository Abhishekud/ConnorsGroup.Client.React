export const SHOW_DELETE_USER = 'SHOW_DELETE_USER';

export function showDeleteUser(user) {
  return {
    type: SHOW_DELETE_USER,
    payload: user,
  };
}
