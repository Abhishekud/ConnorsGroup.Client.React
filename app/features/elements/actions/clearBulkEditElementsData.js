export const CLEAR_BULK_EDIT_ELEMENTS_DATA = 'CLEAR_BULK_EDIT_ELEMENTS_DATA';

export function clearBulkEditElementsData(element) {
  return {
    type: CLEAR_BULK_EDIT_ELEMENTS_DATA,
    payload: element,
  };
}
