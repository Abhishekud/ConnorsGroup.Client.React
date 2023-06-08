export const RESET_ELEMENTS_COLUMNS = 'RESET_ELEMENTS_COLUMNS';
export const RESET_ELEMENTS_COLUMNS_FULFILLED = `${RESET_ELEMENTS_COLUMNS}_FULFILLED`;

export function resetElementsColumns() {
  return {
    type: RESET_ELEMENTS_COLUMNS,
    payload: Promise.resolve(),
  };
}

export default resetElementsColumns;
