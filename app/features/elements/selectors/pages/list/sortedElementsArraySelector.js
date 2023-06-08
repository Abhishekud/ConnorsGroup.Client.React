import {createSelector} from 'reselect';
import {defaultComparator} from '../../../../shared/services';
import {SortDirection} from 'react-virtualized';
import elementsSelector from './elementsSelector';
import sortSelector from './sortSelector';

export default createSelector(
  elementsSelector,
  sortSelector,
  (elements, sort) => {
    const sortBy = sort.get('by');
    const sortDirectionMultiplier = sort.get('direction') === SortDirection.DESC ? -1 : 1;
    const comparator = (x, y) => {
      const result = defaultComparator(x.get(sortBy), y.get(sortBy));
      if (result !== 0 || sortBy === 'id') return result * sortDirectionMultiplier;
      return defaultComparator(x.get('id'), y.get('id'));
    };

    return elements.sort(comparator).valueSeq().toArray();
  }
);
