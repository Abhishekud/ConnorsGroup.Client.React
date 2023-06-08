export const SELECT_ALL_ELEMENT_STEPS_FOR_BULK_EDIT = 'SELECT_ALL_ELEMENT_STEPS_FOR_BULK_EDIT';

export function selectAllElementStepsForBulkEdit(ids) {
  return {
    type: SELECT_ALL_ELEMENT_STEPS_FOR_BULK_EDIT,
    payload: {ids},
  };
}
