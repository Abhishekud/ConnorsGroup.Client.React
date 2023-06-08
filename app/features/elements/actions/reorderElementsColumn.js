export const REORDER_ELEMENTS_COLUMN = 'REORDER_ELEMENTS_COLUMN';

export function reorderElementsColumn(columnKey, oldIndex, newIndex) {
  return {
    type: REORDER_ELEMENTS_COLUMN,
    payload: {columnKey, oldIndex, newIndex},
  };
}
