export const SET_IS_EXPORT_BACKGROUND_JOB = 'SET_IS_EXPORT_BACKGROUND_JOB';

export function setIsExportBackgroundJob(isExportBackgroundJob) {
  return {
    type: SET_IS_EXPORT_BACKGROUND_JOB,
    payload: isExportBackgroundJob,
  };
}
