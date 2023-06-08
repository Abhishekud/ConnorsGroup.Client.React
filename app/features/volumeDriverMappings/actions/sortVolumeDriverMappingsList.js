export const SORT_VOLUME_DRIVER_MAPPINGS_LIST = 'SORT_VOLUME_DRIVER_MAPPINGS_LIST';

export function sortVolumeDriverMappingsList(sort) {
  return {
    type: SORT_VOLUME_DRIVER_MAPPINGS_LIST,
    payload: sort,
  };
}
