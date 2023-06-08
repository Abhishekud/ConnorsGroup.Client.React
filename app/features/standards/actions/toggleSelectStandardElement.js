export const TOGGLE_SELECT_STANDARD_ELEMENT = 'TOGGLE_SELECT_STANDARD_ELEMENT';

export function toggleSelectStandardElement(standardElementId, standardElementGroupId = null, standardElementGroupSelectedFlag = false) {
  return {
    type: TOGGLE_SELECT_STANDARD_ELEMENT,
    payload: {standardElementId, standardElementGroupId, standardElementGroupSelectedFlag},
  };
}
