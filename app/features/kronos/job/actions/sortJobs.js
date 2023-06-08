export const SORT_JOBS = 'SORT_KRONOS_JOBS';

export function sortJobs(sort) {
  return {
    type: SORT_JOBS,
    payload: sort,
  };
}

