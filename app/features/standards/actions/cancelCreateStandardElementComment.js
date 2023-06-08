export const CANCEL_CREATE_STANDARD_ELEMENT_COMMENT = 'CANCEL_CREATE_STANDARD_ELEMENT_COMMENT';

export function cancelCreateStandardElementComment(standardElementId) {
  return {
    type: CANCEL_CREATE_STANDARD_ELEMENT_COMMENT,
    payload: standardElementId,
  };
}
