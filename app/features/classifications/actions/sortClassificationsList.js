export const SORT_CLASSIFICATIONS_LIST = 'SORT_CLASSIFICATIONS_LIST';

export function sortClassificationsList(sort) {
  return {
    type: SORT_CLASSIFICATIONS_LIST,
    payload: sort,
  };
}
