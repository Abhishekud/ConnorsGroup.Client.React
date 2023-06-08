export const SELECT_CLASSIFICATION = 'SELECT_CLASSIFICATION';

export function selectClassification(classification) {
  return {
    type: SELECT_CLASSIFICATION,
    payload: classification,
  };
}
