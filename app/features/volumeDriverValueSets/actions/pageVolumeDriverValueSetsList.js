export const PAGE_VOLUME_DRIVER_VALUE_SETS_LIST = 'PAGE_VOLUME_DRIVER_VALUE_SETS_LIST';

export function pageVolumeDriverValueSetsList(skip) {
  return {
    type: PAGE_VOLUME_DRIVER_VALUE_SETS_LIST,
    payload: skip,
  };
}
