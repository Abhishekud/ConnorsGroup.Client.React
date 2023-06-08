import {createSelector} from 'reselect';
import {orderBy, filterBy} from '@progress/kendo-data-query';
import sortSelector from './sortSelector';
import {fromJS, List} from 'immutable';
import filterSelector from './filterSelector';
import volumeDriverMappingsSelector from './volumeDriverMappingsSelector';

export default createSelector(
  volumeDriverMappingsSelector,
  sortSelector,
  filterSelector,
  (data, sort, filter) => {
    const newData = [];
    List(data).forEach((dataKey, primaryIndex) => {
      newData[primaryIndex] = dataKey[1].toJS();
      const dynamicRowCols = newData[primaryIndex].values;
      if (dynamicRowCols) {
        dynamicRowCols.forEach(rowItem => {
          const volumeDriverMappingSetId = rowItem.volumeDriverMappingSetId;
          newData[primaryIndex][`value${volumeDriverMappingSetId}`] = rowItem.value;
        });
      }
    });
    const f = (filter === null ? null : filter.toJS());
    return fromJS(orderBy(filterBy(newData, f), sort.toJS()));
  }
);
