export const SHOW_DELETE_CLASSIFICATION = 'SHOW_DELETE_CLASSIFICATION';

export function showDeleteClassification(classification) {
  return {
    type: SHOW_DELETE_CLASSIFICATION,
    payload: classification,
  };
}
