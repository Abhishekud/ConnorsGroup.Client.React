export const FILTER_JOB_CLASSES_LIST = 'FILTER_JOB_CLASSES_LIST';

export function filterJobClassesList(filter) {
  return {
    type: FILTER_JOB_CLASSES_LIST,
    payload: filter,
  };
}
