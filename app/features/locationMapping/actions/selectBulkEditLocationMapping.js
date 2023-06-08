export const SELECT_BULK_LOCATION_MAPPING = 'SELECT_BULK_LOCATION_MAPPING';

export function selectBulkEditLocationMapping(selectedLocationMapping, LocationId, location) {
  return {
    type: SELECT_BULK_LOCATION_MAPPING,
    payload: {
      selectedLocationMapping,
      LocationId: LocationId || null,
      location,
    },
  };
}
