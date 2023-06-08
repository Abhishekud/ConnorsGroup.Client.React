import {createSelector} from 'reselect';
import columnOrderSelector from './columnOrderSelector';
import hiddenColumnsSelector from './hiddenColumnsSelector';
import lockedColumnsSelector from './lockedColumnsSelector';
import filterSelector from './filterSelector';
import sortSelector from './sortSelector';
import cachedGridConfigurationSelector from './cachedGridConfigurationSelector';
import isLocationsLoadedSelector from './isLocationsLoadedSelector';

export default createSelector(
  columnOrderSelector,
  hiddenColumnsSelector,
  lockedColumnsSelector,
  filterSelector,
  sortSelector,
  cachedGridConfigurationSelector, isLocationsLoadedSelector,
  (columnOrder, hiddenColumns, lockedColumns, filter, sort, cachedGridConfiguration, isLocationsLoaded) => {
    if (!isLocationsLoaded) return cachedGridConfiguration ? cachedGridConfiguration.toJS() : {};
    return {
      'columns': columnOrder ? columnOrder.toJS() : columnOrder,
      lockedColumns,
      hiddenColumns,
      filter, sort};
  });
