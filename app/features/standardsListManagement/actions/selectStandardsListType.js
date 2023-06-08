export const SELECT_STANDARDS_LIST_TYPE = 'SELECT_STANDARDS_LIST_TYPE';

export function selectStandardsListType(typecode) {
  return {
    type: SELECT_STANDARDS_LIST_TYPE,
    payload: typecode,
  };
}
