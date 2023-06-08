import {createSelector} from 'reselect';
import {orderBy, filterBy} from '@progress/kendo-data-query';
import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import listEntryModelsSelector from './listEntryModelsSelector';
import {fromJS} from 'immutable';


export default createSelector(
  listEntryModelsSelector,
  sortSelector,
  filterSelector,
  (data, sort, filter) => {
    const f = filter === null ? null : filter.toJS();
    return fromJS(orderBy(filterBy(data.toJS(), f), sort.toJS()));
  }
);
