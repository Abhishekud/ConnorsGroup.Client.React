import {http} from '../../shared/services';
export const CREATE_VOLUME_DRIVER_MAPPING_VARIABLES_EXPORT_REQUEST_BACKGROUND_JOB = 'CREATE_VOLUME_DRIVER_MAPPING_VARIABLES_EXPORT_REQUEST_BACKGROUND_JOB';

export function createVolumeDriverMappingVariablesExportRequestBackgroundJob(exportRequestId) {
  return {
    type: CREATE_VOLUME_DRIVER_MAPPING_VARIABLES_EXPORT_REQUEST_BACKGROUND_JOB,
    payload: http.get(`volume-driver-mapping-variables/export/${exportRequestId}`),
  };
}
