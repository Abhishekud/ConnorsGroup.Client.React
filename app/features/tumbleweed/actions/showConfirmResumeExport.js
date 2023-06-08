export const SHOW_CONFIRM_RESUME_TUMBLEWEED_EXPORT = 'SHOW_CONFIRM_RESUME_TUMBLEWEED_EXPORT';

export function showConfirmResumeExport(schedule) {
  return {
    type: SHOW_CONFIRM_RESUME_TUMBLEWEED_EXPORT,
    payload: schedule,
  };
}
