export const CANCEL_CONFIRM_RESUME_TUMBLEWEED_EXPORT = 'CANCEL_CONFIRM_RESUME_TUMBLEWEED_EXPORT';

export function cancelConfirmResumeExport(schedule) {
  return {
    type: CANCEL_CONFIRM_RESUME_TUMBLEWEED_EXPORT,
    payload: schedule,
  };
}
