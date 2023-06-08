export const SHOW_CREATE_STANDARD_ELEMENT = 'SHOW_CREATE_STANDARD_ELEMENT';

export function showCreateStandardElement(elementType, insertAtIndex, standardElementGroupId, standardTimeFormat, addElementModel) {
  return {
    type: SHOW_CREATE_STANDARD_ELEMENT,
    payload: {
      elementType,
      insertAtIndex,
      standardElementGroupId,
      standardTimeFormat,
      addElementModel,
    },
  };
}
