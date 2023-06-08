export const SELECT_BULK_LOCATION = 'SELECT_BULK_LOCATION';

export function selectBulkLocation(selectedLocation, selectedLocations) {
  return {
    type: SELECT_BULK_LOCATION,
    payload: {
      selectedLocation, selectedLocations,
    },
  };
}
