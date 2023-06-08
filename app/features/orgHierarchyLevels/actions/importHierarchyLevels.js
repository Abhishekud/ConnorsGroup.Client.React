import {http} from '../../shared/services';

export const IMPORT_HIERARCHY_LEVELS = 'IMPORT_HIERARCHY_LEVELS';
export const IMPORT_HIERARCHY_LEVELS_PENDING = `${IMPORT_HIERARCHY_LEVELS}_PENDING`;
export const IMPORT_HIERARCHY_LEVELS_FULFILLED = `${IMPORT_HIERARCHY_LEVELS}_FULFILLED`;
export const IMPORT_HIERARCHY_LEVELS_REJECTED = `${IMPORT_HIERARCHY_LEVELS}_REJECTED`;

export function importHierarchyLevels(file) {
  const data = new FormData();
  data.append('file', file);

  return {
    type: IMPORT_HIERARCHY_LEVELS,
    payload: http.post('org-hierarchy-levels/import', data),
  };
}
