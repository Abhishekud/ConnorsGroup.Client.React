export const OPEN_STANDARD_NON_MOST_ELEMENT_EDIT = 'OPEN_STANDARD_NON_MOST_ELEMENT_EDIT';

export function openStandardNonMOSTElementEdit(standardElementId) {
  return {
    type: OPEN_STANDARD_NON_MOST_ELEMENT_EDIT,
    payload: standardElementId,
  };
}
