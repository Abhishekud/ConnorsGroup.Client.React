import {http} from '../../shared/services';

export const IMPORT_LABOR_CATEGORIES = 'IMPORT_LABOR_CATEGORIES';
export const IMPORT_LABOR_CATEGORIES_PENDING = `${IMPORT_LABOR_CATEGORIES}_PENDING`;
export const IMPORT_LABOR_CATEGORIES_FULFILLED = `${IMPORT_LABOR_CATEGORIES}_FULFILLED`;
export const IMPORT_LABOR_CATEGORIES_REJECTED = `${IMPORT_LABOR_CATEGORIES}_REJECTED`;

export function importLaborCategories(file) {
  const data = new FormData();
  data.append('file', file);

  return {
    type: IMPORT_LABOR_CATEGORIES,
    payload: http.post('labor-categories/import', data),
  };
}
