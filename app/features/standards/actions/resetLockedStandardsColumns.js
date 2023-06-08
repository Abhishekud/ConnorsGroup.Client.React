
export const RESET_LOCKED_STANDARDS_COLUMNS = 'RESET_LOCKED_STANDARDS_COLUMNS';
export const RESET_LOCKED_STANDARDS_COLUMNS_FULFILLED = `${RESET_LOCKED_STANDARDS_COLUMNS}_FULFILLED`;

export function resetLockedStandardsColumns() {
  return {
    type: RESET_LOCKED_STANDARDS_COLUMNS,
    payload: Promise.resolve(),
  };
}

export default resetLockedStandardsColumns;
