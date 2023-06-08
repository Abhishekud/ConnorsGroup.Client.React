import {http} from '../services';

export const POLL_BACKGROUND_JOBS = 'POLL_BACKGROUND_JOBS';
export const POLL_BACKGROUND_JOBS_PENDING = `${POLL_BACKGROUND_JOBS}_PENDING`;
export const POLL_BACKGROUND_JOBS_FULFILLED = `${POLL_BACKGROUND_JOBS}_FULFILLED`;
export const POLL_BACKGROUND_JOBS_REJECTED = `${POLL_BACKGROUND_JOBS}_REJECTED`;

export function pollBackgroundJobs(backgroundJobTypes) {
  return {
    type: POLL_BACKGROUND_JOBS,
    payload: http.post('background-jobs/poll', {backgroundJobTypes}),
  };
}
