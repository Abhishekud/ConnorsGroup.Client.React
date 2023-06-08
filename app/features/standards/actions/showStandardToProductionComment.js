export const SHOW_STANDARD_TO_PRODUCTION_COMMENT = 'SHOW_STANDARD_TO_PRODUCTION_COMMENT';

export function showStandardToProductionComment(id, model, oldStatus, performSave) {
  return {
    type: SHOW_STANDARD_TO_PRODUCTION_COMMENT,
    payload: {id, model, oldStatus, performSave},
  };
}
