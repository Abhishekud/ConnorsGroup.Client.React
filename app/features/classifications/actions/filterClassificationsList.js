export const FILTER_CLASSIFICATIONS_LIST = 'FILTER_CLASSIFICATIONS_LIST';

export function filterClassificationsList(filter) {
  return {
    type: FILTER_CLASSIFICATIONS_LIST,
    payload: filter,
  };
}
