import {createSelector} from 'reselect';
import dataSelector from './dataSelector';
import skipSelector from './skipSelector';
import takeSelector from './takeSelector';

export default createSelector(
  dataSelector,
  skipSelector,
  takeSelector,
  (filteredData, skip, take) => filteredData.skip(skip).take(take)
);
