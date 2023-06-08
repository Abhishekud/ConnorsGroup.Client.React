export const SHOW_DELETE_VOLUME_DRIVER = 'SHOW_DELETE_VOLUME_DRIVER';

export function showDeleteVolumeDriver(volumeDriver) {
  return {
    type: SHOW_DELETE_VOLUME_DRIVER,
    payload: volumeDriver,
  };
}
