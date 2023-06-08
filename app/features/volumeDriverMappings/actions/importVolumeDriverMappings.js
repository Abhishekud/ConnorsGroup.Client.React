import {http} from '../../shared/services';

export const IMPORT_VOLUME_DRIVER_MAPPINGS = 'IMPORT_VOLUME_DRIVER_MAPPINGS';
export const IMPORT_VOLUME_DRIVER_MAPPINGS_PENDING = `${IMPORT_VOLUME_DRIVER_MAPPINGS}_PENDING`;
export const IMPORT_VOLUME_DRIVER_MAPPINGS_FULFILLED = `${IMPORT_VOLUME_DRIVER_MAPPINGS}_FULFILLED`;
export const IMPORT_VOLUME_DRIVER_MAPPINGS_REJECTED = `${IMPORT_VOLUME_DRIVER_MAPPINGS}_REJECTED`;

export function importVolumeDriverMappings(departmentId, file) {
  const data = new FormData();
  data.append('file', file);
  data.append('departmentId', departmentId);

  return {
    type: IMPORT_VOLUME_DRIVER_MAPPINGS,
    payload: http.post('volume-driver-mappings/import', data),
  };
}
