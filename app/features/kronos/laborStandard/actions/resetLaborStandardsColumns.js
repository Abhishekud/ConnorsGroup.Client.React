export const RESET_LABOR_STANDARDS_COLUMNS = 'RESET_LABOR_STANDARDS_COLUMNS';
export const RESET_LABOR_STANDARDS_COLUMNS_FULFILLED = `${RESET_LABOR_STANDARDS_COLUMNS}_FULFILLED`;

export function resetLaborStandardsColumns() {
  return {
    type: RESET_LABOR_STANDARDS_COLUMNS,
    payload: Promise.resolve(),
  };
}

export default resetLaborStandardsColumns;
