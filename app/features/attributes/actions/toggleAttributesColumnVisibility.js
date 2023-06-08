export const TOGGLE_ATTRIBUTES_COLUMN_VISIBILITY = 'TOGGLE_ATTRIBUTES_COLUMN_VISIBILITY';
export const TOGGLE_ATTRIBUTES_COLUMN_VISIBILITY_FULFILLED = `${TOGGLE_ATTRIBUTES_COLUMN_VISIBILITY}_FULFILLED`;

export function toggleAttributesColumnVisibility(field, visibility, finalColumns, column) {
  return {
    type: TOGGLE_ATTRIBUTES_COLUMN_VISIBILITY,
    payload: Promise.resolve({field, visibility, finalColumns, column}),
  };
}

export default toggleAttributesColumnVisibility;
