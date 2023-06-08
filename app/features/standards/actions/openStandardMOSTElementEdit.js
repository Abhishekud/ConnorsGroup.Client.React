export const OPEN_STANDARD_MOST_ELEMENT_EDIT = 'OPEN_STANDARD_MOST_ELEMENT_EDIT';

export function openStandardMOSTElementEdit(standardElementId) {
  return {
    type: OPEN_STANDARD_MOST_ELEMENT_EDIT,
    payload: standardElementId,
  };
}
