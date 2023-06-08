export const SHOW_DELETE_JOB_CLASS = 'SHOW_DELETE_JOB_CLASS';

export function showDeleteJobClass(jobClass) {
  return {
    type: SHOW_DELETE_JOB_CLASS,
    payload: jobClass,
  };
}
