export const SET_IS_EXPORT_STANDARDS_AND_VOLUME_DRIVERS_BY_LOCATIONS_REQUEST = 'SET_IS_EXPORT_STANDARDS_AND_VOLUME_DRIVERS_BY_LOCATIONS_REQUEST';

export function setIsExportStandardsAndVolumeDriversByLocationsRequest(valueToSet) {
  return {
    type: SET_IS_EXPORT_STANDARDS_AND_VOLUME_DRIVERS_BY_LOCATIONS_REQUEST,
    payload: valueToSet,
  };
}
