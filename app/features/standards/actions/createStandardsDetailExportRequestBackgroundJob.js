import {http} from '../../shared/services';
export const CREATE_STANDARDS_DETAIL_EXPORT_REQUEST_BACKGROUND_JOB = 'CREATE_STANDARDS_DETAIL_EXPORT_REQUEST_BACKGROUND_JOB';

export function createStandardsDetailExportRequestBackgroundJob(exportRequestId) {
  return {
    type: CREATE_STANDARDS_DETAIL_EXPORT_REQUEST_BACKGROUND_JOB,
    payload: http.get(`standards/export-details/${exportRequestId}`),
  };
}
