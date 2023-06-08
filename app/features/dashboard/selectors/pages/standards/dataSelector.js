import {createSelector} from 'reselect';
import {orderBy, filterBy} from '@progress/kendo-data-query';
import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import sortedListEntryModelsSelector from './sortedListEntryModelsSelector';
import {fromJS} from 'immutable';


export default createSelector(
  sortedListEntryModelsSelector,
  filterSelector,
  sortSelector,
  (mappedData, filter, sort) => {
    const f = filter === null ? null : filter.toJS();
    return fromJS(orderBy(filterBy(mappedData.toJS(), f), sort.toJS()));
  }
);
