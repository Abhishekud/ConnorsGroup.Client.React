import {http} from '../../shared/services';

export const CREATE_LABOR_CATEGORY = 'CREATE_LABOR_CATEGORY';
export const CREATE_LABOR_CATEGORY_PENDING = `${CREATE_LABOR_CATEGORY}_PENDING`;
export const CREATE_LABOR_CATEGORY_FULFILLED = `${CREATE_LABOR_CATEGORY}_FULFILLED`;
export const CREATE_LABOR_CATEGORY_REJECTED = `${CREATE_LABOR_CATEGORY}_REJECTED`;

export function createLaborCategory(model) {
  return {
    type: CREATE_LABOR_CATEGORY,
    payload: http.post('labor-categories', model),
  };
}
