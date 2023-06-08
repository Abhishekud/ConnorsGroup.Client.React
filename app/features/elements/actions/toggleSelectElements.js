export const TOGGLE_SELECT_ELEMENT = 'TOGGLE_SELECT_ELEMENT';

export function toggleSelectElements(elementId) {
  return {
    type: TOGGLE_SELECT_ELEMENT,
    payload: {elementId},
  };
}
