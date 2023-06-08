export const SORT_JOB_CLASSES_LIST = 'SORT_JOB_CLASSES_LIST';

export function sortJobClassesList(sort) {
  return {
    type: SORT_JOB_CLASSES_LIST,
    payload: sort,
  };
}
