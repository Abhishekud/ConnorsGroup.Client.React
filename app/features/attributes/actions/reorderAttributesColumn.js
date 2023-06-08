export const REORDER_ATTRIBUTES_COLUMN = 'REORDER_ATTRIBUTES_COLUMN';

export function reorderAttributesColumn(columnKey, oldIndex, newIndex) {
  return {
    type: REORDER_ATTRIBUTES_COLUMN,
    payload: {columnKey, oldIndex, newIndex},
  };
}
