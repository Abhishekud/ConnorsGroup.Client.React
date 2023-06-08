import {createSelector} from 'reselect';
import {stableSortComparator} from '../../../../shared/services';
import orgHierarchyLevelsSelector from './orgHierarchyLevelsSelector';

export default createSelector(
  orgHierarchyLevelsSelector,
  orgHierarchylevels => {
    const comparator = (x, y) => stableSortComparator(x, y, 'number', 'id', 1);
    return orgHierarchylevels.sort(comparator);
  }
);
