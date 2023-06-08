export const SHOW_CREATE_VOLUME_DRIVER_MAPPING = 'SHOW_CREATE_VOLUME_DRIVER_MAPPING';

export function showCreateVolumeDriverMapping(departmentId) {
  return {
    type: SHOW_CREATE_VOLUME_DRIVER_MAPPING,
    payload: {departmentId},
  };
}
