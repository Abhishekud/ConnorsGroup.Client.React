import {createSelector} from 'reselect';
import {defaultComparator, stableSortComparator} from '../../../../shared/services';
import {SortDirection} from 'react-virtualized';
import partsSelector from './partsSelector';
import sortSelector from './sortSelector';

function getPartFieldValue(part, partFieldId) {
  const field = part.get('partFieldValues').find(pfv => pfv.get('partFieldId') === Number(partFieldId));
  return field ? field.get('value') : '';
}

function customSortComparator(x, y, sortBy, uniqueSortBy, directionMultiplier) {
  if (x.has(sortBy) && y.has(sortBy)) {
    return stableSortComparator(x, y, sortBy, uniqueSortBy, directionMultiplier);
  }

  const xValue = getPartFieldValue(x, sortBy);
  const yValue = getPartFieldValue(y, sortBy);

  const result = defaultComparator(xValue, yValue);

  if (result !== 0 || sortBy === uniqueSortBy) return result * directionMultiplier;

  return defaultComparator(x.get(uniqueSortBy), y.get(uniqueSortBy));
}

export default createSelector(
  partsSelector,
  sortSelector,
  (parts, sort) => {
    const sortBy = sort.get('by');
    const sortDirectionMultiplier = sort.get('direction') === SortDirection.DESC ? -1 : 1;
    const comparator = (x, y) => customSortComparator(
      x, y, sortBy, 'id', sortDirectionMultiplier);

    return parts.sort(comparator).valueSeq().toArray();
  }
);
