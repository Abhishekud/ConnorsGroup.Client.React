import {createSelector} from 'reselect';
import {stableSortComparator} from '../../../../shared/services';
import rolesSelector from './rolesSelector';

export default createSelector(
  rolesSelector,
  roles => {
    const comparator = (x, y) => stableSortComparator(x, y, 'name', 'id', 1);
    return roles.sort(comparator).valueSeq().toArray();
  }
);
