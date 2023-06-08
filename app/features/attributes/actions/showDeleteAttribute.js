export const SHOW_DELETE_ATTRIBUTE = 'SHOW_DELETE_ATTRIBUTE';

export function showDeleteAttribute(attribute) {
  return {
    type: SHOW_DELETE_ATTRIBUTE,
    payload: attribute,
  };
}
