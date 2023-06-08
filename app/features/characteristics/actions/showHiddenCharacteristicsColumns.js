
export const SHOW_HIDDEN_CHARACTERISTICS_COLUMNS = 'SHOW_HIDDEN_CHARACTERISTICS_COLUMNS';
export const SHOW_HIDDEN_CHARACTERISTICS_COLUMNS_FULFILLED = `${SHOW_HIDDEN_CHARACTERISTICS_COLUMNS}_FULFILLED`;

export function showHiddenCharacteristicsColumns() {
  return {
    type: SHOW_HIDDEN_CHARACTERISTICS_COLUMNS,
    payload: Promise.resolve(),
  };
}

export default showHiddenCharacteristicsColumns;
