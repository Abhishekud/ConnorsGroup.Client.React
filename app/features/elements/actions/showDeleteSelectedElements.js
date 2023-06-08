export const SHOW_DELETE_SELECTED_ELEMENTS = 'SHOW_DELETE_SELECTED_ELEMENTS';

export function showDeleteSelectedElements(elementData) {
  return {
    type: SHOW_DELETE_SELECTED_ELEMENTS,
    payload: elementData,
  };
}
