
export const RESET_LOCKED_ATTRIBUTES_COLUMNS = 'RESET_LOCKED_ATTRIBUTES_COLUMNS';
export const RESET_LOCKED_ATTRIBUTES_COLUMNS_FULFILLED = `${RESET_LOCKED_ATTRIBUTES_COLUMNS}_FULFILLED`;

export function resetLockedAttributesColumns() {
  return {
    type: RESET_LOCKED_ATTRIBUTES_COLUMNS,
    payload: Promise.resolve(),
  };
}

export default resetLockedAttributesColumns;
