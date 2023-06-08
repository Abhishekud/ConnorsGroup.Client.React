
export const SHOW_HIDDEN_ELEMENTS_COLUMNS = 'SHOW_HIDDEN_ELEMENTS_COLUMNS';
export const SHOW_HIDDEN_ELEMENTS_COLUMNS_FULFILLED = `${SHOW_HIDDEN_ELEMENTS_COLUMNS}_FULFILLED`;

export function showHiddenElementsColumns() {
  return {
    type: SHOW_HIDDEN_ELEMENTS_COLUMNS,
    payload: Promise.resolve(),
  };
}

export default showHiddenElementsColumns;
