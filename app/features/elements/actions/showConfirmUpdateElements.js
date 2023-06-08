export const SHOW_CONFIRM_UPDATE_ELEMENTS = 'SHOW_CONFIRM_UPDATE_ELEMENTS';

export function showConfirmUpdateElements(model, performSave) {
  return {
    type: SHOW_CONFIRM_UPDATE_ELEMENTS,
    payload: {model, performSave},
  };
}
