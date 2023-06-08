export const SELECT_ALL_STANDARD_ELEMENTS_FOR_BULK_EDIT = 'SELECT_ALL_STANDARD_ELEMENTS_FOR_BULK_EDIT';

export function selectAllStandardElementsForBulkEdit(ids) {
  return {
    type: SELECT_ALL_STANDARD_ELEMENTS_FOR_BULK_EDIT,
    payload: {ids, selected: true},
  };
}
