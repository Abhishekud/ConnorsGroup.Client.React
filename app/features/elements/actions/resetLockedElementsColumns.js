
export const RESET_LOCKED_ELEMENTS_COLUMNS = 'RESET_LOCKED_ELEMENTS_COLUMNS';
export const RESET_LOCKED_ELEMENTS_COLUMNS_FULFILLED = `${RESET_LOCKED_ELEMENTS_COLUMNS}_FULFILLED`;

export function resetLockedElementsColumns() {
  return {
    type: RESET_LOCKED_ELEMENTS_COLUMNS,
    payload: Promise.resolve(),
  };
}

export default resetLockedElementsColumns;
