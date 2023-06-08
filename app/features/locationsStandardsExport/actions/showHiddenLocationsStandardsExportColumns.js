
export const SHOW_HIDDEN_LOCATIONS_STANDARDS_EXPORT_COLUMNS = 'SHOW_HIDDEN_LOCATIONS_STANDARDS_EXPORT_COLUMNS';
export const SHOW_HIDDEN_LOCATIONS_STANDARDS_EXPORT_COLUMNS_FULFILLED = `${SHOW_HIDDEN_LOCATIONS_STANDARDS_EXPORT_COLUMNS}_FULFILLED`;

export function showHiddenLocationsStandardsExportColumns() {
  return {
    type: SHOW_HIDDEN_LOCATIONS_STANDARDS_EXPORT_COLUMNS,
    payload: Promise.resolve(),
  };
}

export default showHiddenLocationsStandardsExportColumns;
