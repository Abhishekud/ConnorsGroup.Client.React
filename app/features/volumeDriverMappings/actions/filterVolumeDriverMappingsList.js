export const FILTER_VOLUME_DRIVER_MAPPING_LIST = 'FILTER_VOLUME_DRIVER_MAPPING_LIST';

export function filterVolumeDriverMappingsList(filter) {
  return {
    type: FILTER_VOLUME_DRIVER_MAPPING_LIST,
    payload: filter,
  };
}
