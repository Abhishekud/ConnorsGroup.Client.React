import {createSelector} from 'reselect';
import {orderBy, filterBy} from '@progress/kendo-data-query';
import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import sortedListEntryModelsSelector from './sortedListEntryModelsSelector';
import {fromJS} from 'immutable';


export default createSelector(
  sortedListEntryModelsSelector,
  sortSelector,
  filterSelector,
  (data, sort, filter) => {
    const f = filter === null ? null : filter.toJS();
    return fromJS(orderBy(filterBy(data.toJS(), f), sort.toJS()));
  }
);
