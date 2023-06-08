export const SELECT_PART = 'SELECT_PART';

export function selectPart(part) {
  return {
    type: SELECT_PART,
    payload: part,
  };
}
