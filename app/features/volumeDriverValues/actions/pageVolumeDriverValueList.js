export const PAGE_VOLUME_DRIVER_VALUE_LIST = 'PAGE_VOLUME_DRIVER_VALUE_LIST';

export function pageVolumeDriverValueList(skip) {
  return {
    type: PAGE_VOLUME_DRIVER_VALUE_LIST,
    payload: skip,
  };
}
