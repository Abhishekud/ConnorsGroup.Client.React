import {createSelector} from 'reselect';
import {stableSortComparator} from '../../../../shared/services';
import {SortDirection} from 'react-virtualized';
import unitsOfMeasureSelector from './unitsOfMeasureSelector';
import sortSelector from './sortSelector';

export default createSelector(
  unitsOfMeasureSelector,
  sortSelector,
  (unitsOfMeasure, sort) => {
    const sortBy = sort.get('by');
    const sortDirectionMultiplier = sort.get('direction') === SortDirection.DESC ? -1 : 1;
    const comparator = (x, y) => stableSortComparator(
      x, y, sortBy, 'id', sortDirectionMultiplier);

    return unitsOfMeasure.sort(comparator).valueSeq().toArray();
  }
);
