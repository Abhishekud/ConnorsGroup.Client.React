import {createSelector} from 'reselect';
import {stableSortComparator} from '../../../../shared/services';
import departmentsSelector from './departmentsSelector';

export default createSelector(
  departmentsSelector,
  departments => {
    const comparator = (x, y) => stableSortComparator(x, y, 'name', 'id', 1);
    return departments.sort(comparator).valueSeq().toArray();
  }
);
