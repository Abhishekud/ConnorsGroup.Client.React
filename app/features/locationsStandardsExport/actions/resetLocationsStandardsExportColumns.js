export const RESET_LOCATIONS_STANDARDS_EXPORT_COLUMNS = 'RESET_LOCATIONS_STANDARDS_EXPORT_COLUMNS';
export const RESET_LOCATIONS_STANDARDS_EXPORT_COLUMNS_FULFILLED = `${RESET_LOCATIONS_STANDARDS_EXPORT_COLUMNS}_FULFILLED`;

export function resetLocationsStandardsExportColumns() {
  return {
    type: RESET_LOCATIONS_STANDARDS_EXPORT_COLUMNS,
    payload: Promise.resolve(),
  };
}

export default resetLocationsStandardsExportColumns;
