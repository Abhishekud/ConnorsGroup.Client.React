export const TOGGLE_CONFIRM_SELECT_ALL_ATTRIBUTES = 'TOGGLE_CONFIRM_SELECT_ALL_ATTRIBUTES';

export function toggleConfirmSelectAllAttributes(toggleConfirmModel) {
  return {
    type: TOGGLE_CONFIRM_SELECT_ALL_ATTRIBUTES,
    payload: toggleConfirmModel,
  };
}
