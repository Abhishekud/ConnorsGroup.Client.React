export const SHOW_PROMOTE_TO_LIST_ELEMENT = 'SHOW_PROMOTE_TO_LIST_ELEMENT';

export function showPromoteToListElement(standardId, standardElementId) {
  return {
    type: SHOW_PROMOTE_TO_LIST_ELEMENT,
    payload: {standardId, standardElementId},
  };
}
