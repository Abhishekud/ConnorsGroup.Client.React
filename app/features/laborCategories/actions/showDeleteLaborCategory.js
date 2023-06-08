export const SHOW_DELETE_LABOR_CATEGORY = 'SHOW_DELETE_LABOR_CATEGORY';

export function showDeleteLaborCategory(laborCategory) {
  return {
    type: SHOW_DELETE_LABOR_CATEGORY,
    payload: laborCategory,
  };
}
