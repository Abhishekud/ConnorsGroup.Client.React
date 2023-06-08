export const OPEN_ELEMENT_SEARCH = 'OPEN_ELEMENT_SEARCH';

export function openElementSearch(standardId, insertAtIndex, standardElementGroupId) {
  return {
    type: OPEN_ELEMENT_SEARCH,
    payload: {
      standardId,
      insertAtIndex,
      standardElementGroupId,
    },
  };
}
