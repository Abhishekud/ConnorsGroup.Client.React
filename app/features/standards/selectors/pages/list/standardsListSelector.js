import {createSelector} from 'reselect';
import standardsSelector from './standardsSelector';
import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import {fromJS} from 'immutable';
import {filterBy, orderBy} from '@progress/kendo-data-query';

export default createSelector(
  standardsSelector,
  sortSelector,
  filterSelector,
  (standards, sort, filter) => {
    const f = filter === null ? null : filter.toJS();
    return fromJS(orderBy(filterBy(standards.toJS(), f), sort.toJS()));
  }
);
