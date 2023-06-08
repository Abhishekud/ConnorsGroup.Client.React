export const RESET_LOCKED_CHARACTERISTICS_COLUMNS = 'RESET_LOCKED_CHARACTERISTICS_COLUMNS';
export const RESET_LOCKED_CHARACTERISTICS_COLUMNS_FULFILLED = `${RESET_LOCKED_CHARACTERISTICS_COLUMNS}_FULFILLED`;

export function resetLockedCharacteristicsColumns() {
  return {
    type: RESET_LOCKED_CHARACTERISTICS_COLUMNS,
    payload: Promise.resolve(),
  };
}

export default resetLockedCharacteristicsColumns;
