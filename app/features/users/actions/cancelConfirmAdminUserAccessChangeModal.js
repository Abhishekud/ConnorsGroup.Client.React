export const CANCEL_CONFIRM_ADMIN_USER_ACCESS_CHANGE_MODAL = 'CANCEL_CONFIRM_ADMIN_USER_ACCESS_CHANGE_MODAL';

export function cancelConfirmAdminUserAccessChangeModal(adminOnlyRoleValue) {
  return {
    type: CANCEL_CONFIRM_ADMIN_USER_ACCESS_CHANGE_MODAL,
    payload: adminOnlyRoleValue,
  };
}
