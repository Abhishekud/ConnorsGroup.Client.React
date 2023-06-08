export const LOAD_STANDARDS_COLUMNS = 'LOAD_STANDARDS_COLUMNS';

export function loadStandardsColumns(columns) {
  return {
    type: LOAD_STANDARDS_COLUMNS,
    payload: columns,
  };
}
