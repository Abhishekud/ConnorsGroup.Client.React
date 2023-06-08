import {createSelector} from 'reselect';
import orgHierarchyLevelsSelector from './orgHierarchyLevelsSelector';

export default createSelector(
  orgHierarchyLevelsSelector,
  orgHierarchyLevels => orgHierarchyLevels.sortBy(ohl => ohl.number)
);
