import {http} from '../../shared/services';
export const CREATE_CHARACTERISTICS_EXPORT_REQUEST_BACKGROUND_JOB = 'CREATE_CHARACTERISTICS_EXPORT_REQUEST_BACKGROUND_JOB';

export function createCharacteristicsExportRequestBackgroundJob(exportRequestId) {
  return {
    type: CREATE_CHARACTERISTICS_EXPORT_REQUEST_BACKGROUND_JOB,
    payload: http.get(`characteristics/export/${exportRequestId}`),
  };
}
