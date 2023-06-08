export const FILTER_JOBS = 'FILTER_KRONOS_JOBS';

export function filterJobs(filter) {
  return {
    type: FILTER_JOBS,
    payload: filter,
  };
}

