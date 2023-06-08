export const SELECT_JOB_CLASS = 'SELECT_JOB_CLASS';

export function selectJobClass(jobClass) {
  return {
    type: SELECT_JOB_CLASS,
    payload: jobClass,
  };
}
