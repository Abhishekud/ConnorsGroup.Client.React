
export const SHOW_HIDDEN_ATTRIBUTES = 'SHOW_HIDDEN_ATTRIBUTES';
export const SHOW_HIDDEN_ATTRIBUTES_FULFILLED = `${SHOW_HIDDEN_ATTRIBUTES}_FULFILLED`;

export function showHiddenAttributeColumns() {
  return {
    type: SHOW_HIDDEN_ATTRIBUTES,
    payload: Promise.resolve(),
  };
}

export default showHiddenAttributeColumns;
