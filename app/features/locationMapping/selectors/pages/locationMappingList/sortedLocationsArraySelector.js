import {createSelector} from 'reselect';
import {stableSortComparator} from '../../../../shared/services';
import {SortDirection} from 'react-virtualized';
import locationsSelector from './locationsSelector';
import sortSelector from './sortSelector';

export default createSelector(
  locationsSelector,
  sortSelector,
  (locations, sort) => {
    const sortBy = sort.get('by');
    const sortDirectionMultiplier = sort.get('direction') === SortDirection.DESC ? -1 : 1;
    const comparator = (x, y) => stableSortComparator(
      x, y, sortBy, 'id', sortDirectionMultiplier);

    return locations.sort(comparator).valueSeq().toArray();
  }
);
