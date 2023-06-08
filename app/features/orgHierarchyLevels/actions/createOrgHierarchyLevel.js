import {http} from '../../shared/services';

export const CREATE_ORG_HIERARCHY_LEVEL = 'CREATE_ORG_HIERARCHY_LEVEL';
export const CREATE_ORG_HIERARCHY_LEVEL_PENDING = `${CREATE_ORG_HIERARCHY_LEVEL}_PENDING`;
export const CREATE_ORG_HIERARCHY_LEVEL_FULFILLED = `${CREATE_ORG_HIERARCHY_LEVEL}_FULFILLED`;
export const CREATE_ORG_HIERARCHY_LEVEL_REJECTED = `${CREATE_ORG_HIERARCHY_LEVEL}_REJECTED`;

export function createOrgHierarchyLevel(insertAtNumber) {
  return {
    type: CREATE_ORG_HIERARCHY_LEVEL,
    payload: {
      promise: http.post('org-hierarchy-levels/create', {insertAtNumber}),
      insertAtNumber,
    },
  };
}
