export const RESET_ATTRIBUTES_COLUMNS = 'RESET_ATTRIBUTES_COLUMNS';
export const RESET_ATTRIBUTES_COLUMNS_FULFILLED = `${RESET_ATTRIBUTES_COLUMNS}_FULFILLED`;

export function resetAttributesColumns() {
  return {
    type: RESET_ATTRIBUTES_COLUMNS,
    payload: Promise.resolve(),
  };
}

export default resetAttributesColumns;
