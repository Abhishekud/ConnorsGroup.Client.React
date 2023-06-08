export const TOGGLE_SELECT_LOCATION_MAPPING = 'TOGGLE_SELECT_LOCATION_MAPPING';

export function toggleSelectLocationMapping(locationId) {
  return {
    type: TOGGLE_SELECT_LOCATION_MAPPING,
    payload: {locationId},
  };
}
