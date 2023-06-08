
export const RESET_LABOR_STANDARDS_LOCKED_COLUMNS = 'RESET_LABOR_STANDARDS_LOCKED_COLUMNS';
export const RESET_LABOR_STANDARDS_LOCKED_COLUMNS_FULFILLED = `${RESET_LABOR_STANDARDS_LOCKED_COLUMNS}_FULFILLED`;

export function resetLaborStandardsLockedColumns() {
  return {
    type: RESET_LABOR_STANDARDS_LOCKED_COLUMNS,
    payload: Promise.resolve(),
  };
}

export default resetLaborStandardsLockedColumns;
