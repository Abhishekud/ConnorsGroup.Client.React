import {http} from '../../../shared/services';
export const CREATE_LABOR_PERIODS_EXPORT_REQUEST_BACKGROUND_JOB = 'CREATE_LABOR_PERIODS_EXPORT_REQUEST_BACKGROUND_JOB';

export function createLaborPeriodsExportRequestBackgroundJob(exportRequestId) {
  return {
    type: CREATE_LABOR_PERIODS_EXPORT_REQUEST_BACKGROUND_JOB,
    payload: http.get(`kronos/laborperiod/export/${exportRequestId}`),
  };
}
