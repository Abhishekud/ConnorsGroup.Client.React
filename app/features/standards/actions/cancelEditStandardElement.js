export const CANCEL_EDIT_STANDARD_ELEMENT = 'CANCEL_EDIT_STANDARD_ELEMENT';

export function cancelEditStandardElement(standardElementId) {
  return {
    type: CANCEL_EDIT_STANDARD_ELEMENT,
    payload: standardElementId,
  };
}
