export const REORDER_PARTS_GRID_COLUMN = 'REORDER_PARTS_GRID_COLUMN';

export function reorderPartsGridColumn(columnKey, oldIndex, newIndex) {
  return {
    type: REORDER_PARTS_GRID_COLUMN,
    payload: {columnKey, oldIndex, newIndex},
  };
}
