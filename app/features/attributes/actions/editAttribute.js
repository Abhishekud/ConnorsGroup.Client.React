export const EDIT_ATTRIBUTE = 'EDIT_ATTRIBUTE';

export function editAttribute(id) {
  return {
    type: EDIT_ATTRIBUTE,
    payload: id,
  };
}
