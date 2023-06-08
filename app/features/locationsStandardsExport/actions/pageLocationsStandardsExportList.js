export const PAGE_LOCATIONS_STANDARDS_EXPORT_LIST = 'PAGE_LOCATIONS_STANDARDS_EXPORT_LIST';

export function pageLocationsStandardsExportList(newSkip) {
  return {
    type: PAGE_LOCATIONS_STANDARDS_EXPORT_LIST,
    payload: newSkip,
  };
}
