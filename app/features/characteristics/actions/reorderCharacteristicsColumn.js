export const REORDER_CHARACTERISTICS_COLUMN = 'REORDER_CHARACTERISTICS_COLUMNS';

export function reorderCharacteristicsColumn(columnKey, oldIndex, newIndex) {
  return {
    type: REORDER_CHARACTERISTICS_COLUMN,
    payload: {columnKey, oldIndex, newIndex},
  };
}
export default reorderCharacteristicsColumn;
