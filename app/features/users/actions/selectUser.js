export const SELECT_USER = 'SELECT_USER';

export function selectUser(user) {
  return {
    type: SELECT_USER,
    payload: user,
  };
}
