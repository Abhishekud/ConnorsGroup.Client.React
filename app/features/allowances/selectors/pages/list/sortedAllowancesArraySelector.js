import {createSelector} from 'reselect';
import {stableSortComparator} from '../../../../shared/services';
import {SortDirection} from 'react-virtualized';
import allowancesSelector from './allowancesSelector';
import sortSelector from './sortSelector';

export default createSelector(
  allowancesSelector,
  sortSelector,
  (allowances, sort) => {
    const sortBy = sort.get('by');
    const sortDirectionMultiplier = sort.get('direction') === SortDirection.DESC ? -1 : 1;
    const comparator = (x, y) => stableSortComparator(
      x, y, sortBy, 'id', sortDirectionMultiplier);

    return allowances.sort(comparator).valueSeq().toArray();
  }
);
