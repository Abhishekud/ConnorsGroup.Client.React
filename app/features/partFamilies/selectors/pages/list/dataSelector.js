import {createSelector} from 'reselect';
import partFamiliesSelector from './partFamiliesSelector';
import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import {fromJS} from 'immutable';
import {orderBy, filterBy} from '@progress/kendo-data-query';


export default createSelector(
  partFamiliesSelector,
  sortSelector,
  filterSelector,
  (data, sort, filter) => {
    const f = filter === null ? null : filter.toJS();
    const allowances = Object.values(data.toJS());
    return fromJS(orderBy(filterBy(allowances, f), sort.toJS()));
  }
);
