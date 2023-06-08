export const SORT_VOLUME_DRIVERS_LIST = 'SORT_VOLUME_DRIVERS_LIST';

export function sortVolumeDriversList(sort) {
  return {
    type: SORT_VOLUME_DRIVERS_LIST,
    payload: sort,
  };
}
