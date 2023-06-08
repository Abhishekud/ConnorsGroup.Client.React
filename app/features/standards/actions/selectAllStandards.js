export const SELECT_ALL_STANDARDS_IN_STANDARDS_LIST = 'SELECT_ALL_STANDARDS_IN_STANDARDS_LIST';

export function selectAllStandards(ids, selected) {
  return {
    type: SELECT_ALL_STANDARDS_IN_STANDARDS_LIST,
    payload: {ids, selected},
  };
}
