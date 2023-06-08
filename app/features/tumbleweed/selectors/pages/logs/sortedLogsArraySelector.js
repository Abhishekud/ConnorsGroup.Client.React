import {createSelector} from 'reselect';
import logsSelector from './tumbleweedLogsSelector';
import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import {orderBy, filterBy} from '@progress/kendo-data-query';

export default createSelector(
  logsSelector,
  sortSelector,
  filterSelector,
  (data, sort, filter) => {
    const activities = Object.values(data.toJS());
    const f = filterBy(activities, filter === null ? null : filter.toJS());
    return orderBy(f, sort.toJS());
  }
);
