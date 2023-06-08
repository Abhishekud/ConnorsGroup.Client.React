export const SELECT_LABOR_CATEGORY = 'SELECT_LABOR_CATEGORY';

export function selectLaborCategory(laborCategory) {
  return {
    type: SELECT_LABOR_CATEGORY,
    payload: laborCategory,
  };
}
