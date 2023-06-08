export const CLEAR_FINISHED_JOB = 'CLEAR_FINISHED_JOB';

export function clearFinishedJob() {
  return {
    type: CLEAR_FINISHED_JOB,
  };
}
