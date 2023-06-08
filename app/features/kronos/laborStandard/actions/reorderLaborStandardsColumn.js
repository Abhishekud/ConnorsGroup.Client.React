export const REORDER_LABOR_STANDARDS_COLUMN = 'REORDER_LABOR_STANDARDS_COLUMN';

export function reorderLaborStandardsColumn(columnKey, oldIndex, newIndex) {
  return {
    type: REORDER_LABOR_STANDARDS_COLUMN,
    payload: {columnKey, oldIndex, newIndex},
  };
}
