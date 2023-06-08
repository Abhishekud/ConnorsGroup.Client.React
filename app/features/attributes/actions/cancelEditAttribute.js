export const CANCEL_EDIT_ATTRIBUTE = 'CANCEL_EDIT_ATTRIBUTE';

export function cancelEditAttribute(id) {
  return {
    type: CANCEL_EDIT_ATTRIBUTE,
    payload: id,
  };
}
