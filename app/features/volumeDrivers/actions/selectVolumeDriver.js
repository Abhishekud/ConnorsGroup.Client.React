export const SELECT_VOLUME_DRIVER = 'SELECT_VOLUME_DRIVER';

export function selectVolumeDriver(volumeDriver) {
  return {
    type: SELECT_VOLUME_DRIVER,
    payload: volumeDriver,
  };
}
