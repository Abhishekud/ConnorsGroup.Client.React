export const SET_IS_EXPORT_SELECTED_VDV_SETS_BACKGROUND_JOB = 'SET_IS_EXPORT_SELECTED_VDV_SETS_BACKGROUND_JOB';

export function setIsExportSelectedVDVSetsBackgroundJob(isExportBackgroundJob) {
  return {
    type: SET_IS_EXPORT_SELECTED_VDV_SETS_BACKGROUND_JOB,
    payload: isExportBackgroundJob,
  };
}
