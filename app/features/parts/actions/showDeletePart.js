export const SHOW_DELETE_PART = 'SHOW_DELETE_PART';

export function showDeletePart(part) {
  return {
    type: SHOW_DELETE_PART,
    payload: part,
  };
}
