import {createSelector} from 'reselect';
import {stableSortComparator} from '../../../../shared/services';
import {SortDirection} from 'react-virtualized';
import permissionsSelector from './permissionsSelector';
import sortSelector from './sortSelector';

export default createSelector(
  permissionsSelector,
  sortSelector,
  (permissions, sort) => {
    const sortBy = sort.get('by');
    const sortDirectionMultiplier = sort.get('direction') === SortDirection.DESC ? -1 : 1;
    const comparator = (x, y) => stableSortComparator(
      x, y, sortBy, 'id', sortDirectionMultiplier);

    return permissions.sort(comparator).valueSeq().toArray();
  }
);
