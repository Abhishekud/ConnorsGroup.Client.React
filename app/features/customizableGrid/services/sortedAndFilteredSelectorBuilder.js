import {createSelector} from 'reselect';
import {fromJS} from 'immutable';
import {orderBy, filterBy} from '@progress/kendo-data-query';

export default (dataSelector, sortSelector, filterSelector) =>
  createSelector(
    dataSelector,
    sortSelector,
    filterSelector,
    (data, sort, filter) => fromJS(orderBy(filterBy(data.toJS(), (filter === null ? null : filter.toJS())), sort.toJS()))
  );
