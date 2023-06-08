export const REORDER_LOCATIONS_STANDARDS_EXPORT_COLUMN = 'REORDER_LOCATIONS_STANDARDS_EXPORT_COLUMN';

export function reorderLocationsStandardsExportColumn(columnKey, oldIndex, newIndex) {
  return {
    type: REORDER_LOCATIONS_STANDARDS_EXPORT_COLUMN,
    payload: {columnKey, oldIndex, newIndex},
  };
}
