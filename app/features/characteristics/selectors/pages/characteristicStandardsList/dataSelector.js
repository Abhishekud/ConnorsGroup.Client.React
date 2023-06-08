import {createSelector} from 'reselect';
import {orderBy, filterBy} from '@progress/kendo-data-query';
import sortSelector from './sortSelector';
import {List, fromJS} from 'immutable';
import filterSelector from './filterSelector';
import characteristicStandardsSelector from './characteristicStandardsSelector';

export default createSelector(
  characteristicStandardsSelector,
  sortSelector,
  filterSelector,
  (data, sort, filter) => {
    const newData = [];
    List(data).forEach((dataKey, primaryIndex) => {
      newData[primaryIndex] = dataKey[1].toJS();
    });
    const f = filterBy(newData, filter === null ? null : filter.toJS());
    return fromJS(orderBy(f, sort.toJS()));
  }
);
