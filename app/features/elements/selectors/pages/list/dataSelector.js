import {createSelector} from 'reselect';
import {orderBy, filterBy} from '@progress/kendo-data-query';
import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import mappingSelector from './mappingSelector';
import {fromJS} from 'immutable';


export default createSelector(
  mappingSelector,
  filterSelector,
  sortSelector,
  (mappedData, filter, sort) => {
    const f = filter === null ? null : filter.toJS();
    return fromJS(orderBy(filterBy(mappedData, f), sort.toJS()));
  }
);
