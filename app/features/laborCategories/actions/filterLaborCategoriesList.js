export const FILTER_LABOR_CATEGORIES_LIST = 'FILTER_LABOR_CATEGORIES_LIST';

export function filterLaborCategoriesList(filter) {
  return {
    type: FILTER_LABOR_CATEGORIES_LIST,
    payload: filter,
  };
}
