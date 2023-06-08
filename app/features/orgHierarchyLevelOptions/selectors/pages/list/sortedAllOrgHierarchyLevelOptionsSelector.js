import {createSelector} from 'reselect';
import {stableSortComparator} from '../../../../shared/services';
import allOrgHierarchyLevelOptionsSelector from './allOrgHierarchyLevelOptionsSelector';

export default createSelector(
  allOrgHierarchyLevelOptionsSelector,
  allOrgHierarchyLevelOptions => {
    const comparator = (x, y) => stableSortComparator(x, y, 'value', 'id', 1);
    return allOrgHierarchyLevelOptions.sort(comparator);
  }
);
