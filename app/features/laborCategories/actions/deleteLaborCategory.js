import {http} from '../../shared/services';

export const DELETE_LABOR_CATEGORY = 'DELETE_LABOR_CATEGORY';
export const DELETE_LABOR_CATEGORY_PENDING = `${DELETE_LABOR_CATEGORY}_PENDING`;
export const DELETE_LABOR_CATEGORY_FULFILLED = `${DELETE_LABOR_CATEGORY}_FULFILLED`;
export const DELETE_LABOR_CATEGORY_REJECTED = `${DELETE_LABOR_CATEGORY}_REJECTED`;

export function deleteLaborCategory(laborCategoryId) {
  return {
    type: DELETE_LABOR_CATEGORY,
    payload: http.delete(`labor-categories/${laborCategoryId}`),
  };
}
