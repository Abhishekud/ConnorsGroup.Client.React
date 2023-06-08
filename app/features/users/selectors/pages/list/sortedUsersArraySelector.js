import {createSelector} from 'reselect';
import {stableSortComparator} from '../../../../shared/services';
import {SortDirection} from 'react-virtualized';
import usersSelector from './usersSelector';
import sortSelector from './sortSelector';

export default createSelector(
  usersSelector,
  sortSelector,
  (users, sort) => {
    const sortBy = sort.get('by');
    const sortDirectionMultiplier = sort.get('direction') === SortDirection.DESC ? -1 : 1;
    const comparator = (x, y) => stableSortComparator(
      x, y, sortBy, 'email', sortDirectionMultiplier);

    return users.sort(comparator).valueSeq().toArray();
  }
);
