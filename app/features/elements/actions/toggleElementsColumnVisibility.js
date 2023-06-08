export const TOGGLE_ELEMENTS_COLUMN_VISIBILITY = 'TOGGLE_ELEMENTS_COLUMN_VISIBILITY';

export function toggleElementsColumnVisibility(field, visibility, finalColumns, selectedColumn) {
  return {
    type: TOGGLE_ELEMENTS_COLUMN_VISIBILITY,
    payload: {field, visibility, finalColumns, selectedColumn},
  };
}

export default toggleElementsColumnVisibility;

