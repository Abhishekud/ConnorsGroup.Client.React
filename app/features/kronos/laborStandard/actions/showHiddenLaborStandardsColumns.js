
export const SHOW_LABOR_STANDARDS_HIDDEN_COLUMNS = 'SHOW_LABOR_STANDARDS_HIDDEN_COLUMNS';
export const SHOW_LABOR_STANDARDS_HIDDEN_COLUMNS_FULFILLED = `${SHOW_LABOR_STANDARDS_HIDDEN_COLUMNS}_FULFILLED`;

export function showHiddenLaborStandardsColumns() {
  return {
    type: SHOW_LABOR_STANDARDS_HIDDEN_COLUMNS,
    payload: Promise.resolve(),
  };
}

export default showHiddenLaborStandardsColumns;
