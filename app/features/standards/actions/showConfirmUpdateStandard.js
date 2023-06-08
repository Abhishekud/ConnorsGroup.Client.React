export const SHOW_CONFIRM_UPDATE_STANDARD = 'SHOW_CONFIRM_UPDATE_STANDARD';

export function showConfirmUpdateStandard(id, model, oldStatus, performSave) {
  return {
    type: SHOW_CONFIRM_UPDATE_STANDARD,
    payload: {id, model, oldStatus, performSave},
  };
}
