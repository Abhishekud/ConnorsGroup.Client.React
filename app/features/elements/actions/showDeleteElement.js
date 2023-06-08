export const SHOW_DELETE_ELEMENT = 'SHOW_DELETE_ELEMENT';

export function showDeleteElement(element) {
  return {
    type: SHOW_DELETE_ELEMENT,
    payload: element,
  };
}
