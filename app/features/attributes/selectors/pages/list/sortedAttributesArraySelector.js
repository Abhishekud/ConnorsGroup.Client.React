import {createSelector} from 'reselect';
import {stableSortComparator} from '../../../../shared/services';
import attributesSelector from './attributesSelector';

export default createSelector(
  attributesSelector,
  attributes => {
    const comparator = (x, y) => stableSortComparator(x, y, 'name', 'id', 1);
    return attributes.sort(comparator).valueSeq().toArray();
  }
);
