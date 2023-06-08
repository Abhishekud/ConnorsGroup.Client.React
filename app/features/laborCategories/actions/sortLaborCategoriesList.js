export const SORT_LABOR_CATEGORIES_LIST = 'SORT_LABOR_CATEGORIES_LIST';

export function sortLaborCategoriesList(sort) {
  return {
    type: SORT_LABOR_CATEGORIES_LIST,
    payload: sort,
  };
}
