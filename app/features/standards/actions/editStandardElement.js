export const EDIT_STANDARD_ELEMENT = 'EDIT_STANDARD_ELEMENT';

export function editStandardElement(standardElementId) {
  return {
    type: EDIT_STANDARD_ELEMENT,
    payload: standardElementId,
  };
}
