export const RESET_LOCKED_LOCATIONS_STANDARDS_EXPORT_COLUMNS = 'RESET_LOCKED_LOCATIONS_STANDARDS_EXPORT_COLUMNS';
export const RESET_LOCKED_LOCATIONS_STANDARDS_EXPORT_COLUMNS_FULFILLED = `${RESET_LOCKED_LOCATIONS_STANDARDS_EXPORT_COLUMNS}_FULFILLED`;

export function resetLockedLocationsStandardsExportColumns() {
  return {
    type: RESET_LOCKED_LOCATIONS_STANDARDS_EXPORT_COLUMNS,
    payload: Promise.resolve(),
  };
}

export default resetLockedLocationsStandardsExportColumns;
