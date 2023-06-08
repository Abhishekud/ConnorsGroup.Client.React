export const SHOW_EXPORT_LOCATIONS_STANDARDS_BY_DATE = 'SHOW_EXPORT_LOCATIONS_STANDARDS_BY_DATE';

export function showExportLocationsStandardsByDate(timeFormat, filters) {
  return {
    type: SHOW_EXPORT_LOCATIONS_STANDARDS_BY_DATE,
    payload: {timeFormat, filters},
  };
}
