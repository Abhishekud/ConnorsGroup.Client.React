export const TOGGLE_LOCATIONS_STANDARDS_EXPORT_COLUMN_LOCK = 'TOGGLE_LOCATIONS_STANDARDS_EXPORT_COLUMN_LOCK';

export function toggleLocationsStandardsExportColumnLock(field, value, finalColumns) {
  return {
    type: TOGGLE_LOCATIONS_STANDARDS_EXPORT_COLUMN_LOCK,
    payload: {field, value, finalColumns},
  };
}

export default toggleLocationsStandardsExportColumnLock;
