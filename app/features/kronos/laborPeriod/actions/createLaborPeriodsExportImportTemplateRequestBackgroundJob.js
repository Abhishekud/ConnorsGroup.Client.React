import {http} from '../../../shared/services';
export const CREATE_LABOR_PERIODS_EXPORT_IMPORT_TEMPLATE_REQUEST_BACKGROUND_JOB = 'CREATE_LABOR_PERIODS_EXPORT_IMPORT_TEMPLATE_REQUEST_BACKGROUND_JOB';

export function createLaborPeriodsExportImportTemplateRequestBackgroundJob(exportRequestId) {
  return {
    type: CREATE_LABOR_PERIODS_EXPORT_IMPORT_TEMPLATE_REQUEST_BACKGROUND_JOB,
    payload: http.get(`kronos/laborperiod/import/template/${exportRequestId}`),
  };
}
