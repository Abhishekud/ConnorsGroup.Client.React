import {createSelector} from 'reselect';
import orgHierarchyLevelsSelector from './orgHierarchyLevelsSelector';

export default createSelector(
  orgHierarchyLevelsSelector,
  orgHierarchyLevels => orgHierarchyLevels.valueSeq().map(ohl => ohl.number).max()
);
