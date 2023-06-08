export const SELECT_ELEMENT = 'SELECT_ELEMENT';

export function selectElement(id) {
  return {
    type: SELECT_ELEMENT,
    payload: id,
  };
}
