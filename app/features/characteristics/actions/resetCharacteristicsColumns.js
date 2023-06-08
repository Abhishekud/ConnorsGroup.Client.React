export const RESET_CHARACTERISTICS_COLUMNS = 'RESET_CHARACTERISTICS_COLUMNS';
export const RESET_CHARACTERISTICS_COLUMNS_FULFILLED = `${RESET_CHARACTERISTICS_COLUMNS}_FULFILLED`;

export function resetCharacteristicsColumns() {
  return {
    type: RESET_CHARACTERISTICS_COLUMNS,
    payload: Promise.resolve(),
  };
}

export default resetCharacteristicsColumns;
