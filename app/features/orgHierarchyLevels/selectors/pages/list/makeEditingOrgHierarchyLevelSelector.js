import {createSelector} from 'reselect';
import orgHierarchyLevelStatesSelector from './orgHierarchyLevelStatesSelector';
import orgHierarchyLevelIdSelector from './orgHierarchyLevelIdSelector';

export default () =>
  createSelector(
    orgHierarchyLevelStatesSelector,
    orgHierarchyLevelIdSelector,
    (orgHierarchyLevelStates, orgHierarchyLevelId) => orgHierarchyLevelStates.getIn([orgHierarchyLevelId, 'editing'])
  );
