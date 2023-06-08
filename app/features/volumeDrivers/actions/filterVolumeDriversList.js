export const FILTER_VOLUME_DRIVERS_LIST = 'FILTER_VOLUME_DRIVERS_LIST';

export function filterVolumeDriversList(filter) {
  return {
    type: FILTER_VOLUME_DRIVERS_LIST,
    payload: filter,
  };
}
