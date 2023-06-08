import {http} from '../../shared/services';

export const UPDATE_LABOR_CATEGORY = 'UPDATE_LABOR_CATEGORY';
export const UPDATE_LABOR_CATEGORY_PENDING = `${UPDATE_LABOR_CATEGORY}_PENDING`;
export const UPDATE_LABOR_CATEGORY_FULFILLED = `${UPDATE_LABOR_CATEGORY}_FULFILLED`;
export const UPDATE_LABOR_CATEGORY_REJECTED = `${UPDATE_LABOR_CATEGORY}_REJECTED`;

export function updateLaborCategory(laborCategory) {
  return {
    type: UPDATE_LABOR_CATEGORY,
    payload: http.put(`labor-categories/${laborCategory.get('id')}`, laborCategory),
  };
}
