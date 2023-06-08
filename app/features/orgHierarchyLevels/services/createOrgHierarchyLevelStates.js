import {Map} from 'immutable';
import createOrgHierarchyLevelState from './createOrgHierarchyLevelState';

export default function (orgHierarchyLevels) {
  return Map(orgHierarchyLevels.map(orgHierarchyLevel => [orgHierarchyLevel.id, createOrgHierarchyLevelState()]));
}
