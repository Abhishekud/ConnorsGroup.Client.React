import {http} from '../../shared/services';

export const LOAD_LABOR_CATEGORIES_LIST = 'LOAD_LABOR_CATEGORIES_LIST';
export const LOAD_LABOR_CATEGORIES_LIST_PENDING = `${LOAD_LABOR_CATEGORIES_LIST}_PENDING`;
export const LOAD_LABOR_CATEGORIES_LIST_FULFILLED = `${LOAD_LABOR_CATEGORIES_LIST}_FULFILLED`;
export const LOAD_LABOR_CATEGORIES_LIST_REJECTED = `${LOAD_LABOR_CATEGORIES_LIST}_REJECTED`;

export function loadLaborCategoriesList() {
  return {
    type: LOAD_LABOR_CATEGORIES_LIST,
    payload: http.get('labor-categories/list'),
  };
}
