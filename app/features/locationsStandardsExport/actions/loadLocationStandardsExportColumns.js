
export const LOAD_LOCATION_STANDARDS_EXPORT_COLUMNS = 'LOAD_LOCATION_STANDARDS_EXPORT_COLUMNS';

export function loadLocationStandardsExportColumns(columns) {
  return {
    type: LOAD_LOCATION_STANDARDS_EXPORT_COLUMNS,
    payload: columns,
  };
}
export default loadLocationStandardsExportColumns;
