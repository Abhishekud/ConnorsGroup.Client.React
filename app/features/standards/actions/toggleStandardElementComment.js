export const TOGGLE_STANDARD_ELEMENT_COMMENT = 'TOGGLE_STANDARD_ELEMENT_COMMENT';

export function toggleStandardElementComment(standardElementId) {
  return {
    type: TOGGLE_STANDARD_ELEMENT_COMMENT,
    payload: standardElementId,
  };
}
