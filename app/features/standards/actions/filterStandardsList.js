export const FILTER_STANDARDS_LIST = 'FILTER_STANDARDS_LIST';

export function filterStandardsList(filter) {
  return {
    type: FILTER_STANDARDS_LIST,
    payload: filter,
  };
}
