export const SHOW_SET_USER_PASSWORD = 'SHOW_SET_USER_PASSWORD';

export function showSetUserPassword(user) {
  return {
    type: SHOW_SET_USER_PASSWORD,
    payload: user,
  };
}
