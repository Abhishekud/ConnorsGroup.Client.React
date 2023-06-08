export const REORDER_STANDARDS_COLUMN = 'REORDER_STANDARDS_COLUMN';

export function reorderStandardsColumn(columnKey, oldIndex, newIndex) {
  return {
    type: REORDER_STANDARDS_COLUMN,
    payload: {columnKey, oldIndex, newIndex},
  };
}
