import {http} from '../../shared/services';

export const IMPORT_ORG_HIERARCHY_LEVEL_OPTIONS = 'IMPORT_ORG_HIERARCHY_LEVEL_OPTIONS';
export const IMPORT_ORG_HIERARCHY_LEVEL_OPTIONS_PENDING = `${IMPORT_ORG_HIERARCHY_LEVEL_OPTIONS}_PENDING`;
export const IMPORT_ORG_HIERARCHY_LEVEL_OPTIONS_FULFILLED = `${IMPORT_ORG_HIERARCHY_LEVEL_OPTIONS}_FULFILLED`;
export const IMPORT_ORG_HIERARCHY_LEVEL_OPTIONS_REJECTED = `${IMPORT_ORG_HIERARCHY_LEVEL_OPTIONS}_REJECTED`;

export function importOrgHierarchyLevelOptions(orgHierarchyLevelId, file) {
  const data = new FormData();
  data.append('file', file);

  return {
    type: IMPORT_ORG_HIERARCHY_LEVEL_OPTIONS,
    payload: http.post(`org-hierarchy-levels/${orgHierarchyLevelId}/options/import`, data),
  };
}
