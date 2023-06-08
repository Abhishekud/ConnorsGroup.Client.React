export const TOGGLE_LOCATIONS_STANDARDS_EXPORT_COLUMN_VISIBILITY = 'TOGGLE_LOCATIONS_STANDARDS_EXPORT_COLUMN_VISIBILITY';
export const TOGGLE_LOCATIONS_STANDARDS_EXPORT_COLUMN_VISIBILITY_FULFILLED = `${TOGGLE_LOCATIONS_STANDARDS_EXPORT_COLUMN_VISIBILITY}_FULFILLED`;

export function toggleLocationsStandardsExportColumnVisibility(field, visibility, finalColumns, selectedColumn) {
  return {
    type: TOGGLE_LOCATIONS_STANDARDS_EXPORT_COLUMN_VISIBILITY,
    payload: Promise.resolve({field, visibility, finalColumns, selectedColumn}),
  };
}

export default toggleLocationsStandardsExportColumnVisibility;
