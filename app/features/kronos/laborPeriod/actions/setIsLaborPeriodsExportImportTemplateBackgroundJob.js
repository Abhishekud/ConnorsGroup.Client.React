export const SET_IS_LABOR_PERIODS_EXPORT_IMPORT_TEMPLATE_BACKGROUND_JOB = 'SET_IS_LABOR_PERIODS_EXPORT_IMPORT_TEMPLATE_BACKGROUND_JOB';

export function setIsLaborPeriodsExportImportTemplateBackgroundJob(isExportBackgroundJob) {
  return {
    type: SET_IS_LABOR_PERIODS_EXPORT_IMPORT_TEMPLATE_BACKGROUND_JOB,
    payload: isExportBackgroundJob,
  };
}

