import {createSelector} from 'reselect';
import {stableSortComparator} from '../../../../shared/services';
import {SortDirection} from 'react-virtualized';
import orgHierarchyLevelOptionsSelector from './orgHierarchyLevelOptionsSelector';
import sortSelector from './sortSelector';

export default createSelector(
  orgHierarchyLevelOptionsSelector,
  sortSelector,
  (orgHierarchyLevelOptions, sort) => {
    const sortBy = sort.get('by');
    const sortDirectionMultiplier = sort.get('direction') === SortDirection.DESC ? -1 : 1;
    const comparator = (x, y) => stableSortComparator(
      x, y, sortBy, 'id', sortDirectionMultiplier);

    return orgHierarchyLevelOptions.sort(comparator).valueSeq().toArray();
  }
);
