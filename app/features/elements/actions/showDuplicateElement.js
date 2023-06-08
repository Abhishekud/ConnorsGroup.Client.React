export const SHOW_DUPLICATE_ELEMENT = 'SHOW_DUPLICATE_ELEMENT';

export function showDuplicateElement(model, elementType) {
  return {
    type: SHOW_DUPLICATE_ELEMENT,
    payload: {model, elementType},
  };
}
