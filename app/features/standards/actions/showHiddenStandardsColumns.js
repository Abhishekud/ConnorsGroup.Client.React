
export const SHOW_HIDDEN_STANDARDS_COLUMNS = 'SHOW_HIDDEN_STANDARDS_COLUMNS';
export const SHOW_HIDDEN_STANDARDS_COLUMNS_FULFILLED = `${SHOW_HIDDEN_STANDARDS_COLUMNS}_FULFILLED`;

export function showHiddenStandardsColumns() {
  return {
    type: SHOW_HIDDEN_STANDARDS_COLUMNS,
    payload: Promise.resolve(),
  };
}

export default showHiddenStandardsColumns;
