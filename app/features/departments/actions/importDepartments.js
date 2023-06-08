import {http} from '../../shared/services';

export const IMPORT_DEPARTMENTS = 'IMPORT_DEPARTMENTS';
export const IMPORT_DEPARTMENTS_PENDING = `${IMPORT_DEPARTMENTS}_PENDING`;
export const IMPORT_DEPARTMENTS_FULFILLED = `${IMPORT_DEPARTMENTS}_FULFILLED`;
export const IMPORT_DEPARTMENTS_REJECTED = `${IMPORT_DEPARTMENTS}_REJECTED`;

export function importDepartments(file) {
  const data = new FormData();
  data.append('file', file);

  return {
    type: IMPORT_DEPARTMENTS,
    payload: http.post('departments/import', data),
  };
}
