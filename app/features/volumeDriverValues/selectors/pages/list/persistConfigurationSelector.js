import {createSelector} from 'reselect';
import filterSelector from './filterSelector';
import sortSelector from './sortSelector';
import columnOrderSelector from './columnOrderSelector';
import hiddenColumnsSelector from './hiddenColumnsSelector';
import lockedColumnsSelector from './lockedColumnsSelector';
import selectedVolumeDriverValueSetIdSelector from './selectedVolumeDriverValueSetIdSelector';
import cachedGridConfigurationSelector from './cachedGridConfigurationSelector';
import isVolumeDriverValuesLoadedSelector from './isVolumeDriverValuesLoadedSelector';
import saveCachedGridConfigurationSelector from './saveCachedGridConfigurationSelector';

function updateColumnsConfiguration(selectedVolumeDriverValueSetId, cachedGridConfiguration, columnConfiguration) {
  const retrievedColumns = (cachedGridConfiguration && Object.keys(cachedGridConfiguration).length) ? cachedGridConfiguration.toJS() : {};
  const {volumeDriverValueSet} = retrievedColumns;

  if (!Array.isArray(volumeDriverValueSet)) {
    const tempData = {volumeDriverValueSet: []};
    tempData.volumeDriverValueSet.push(columnConfiguration);
    return tempData;
  }

  const index = volumeDriverValueSet?.findIndex((col => col.id === selectedVolumeDriverValueSetId));
  if (index > -1) {
    retrievedColumns.volumeDriverValueSet[index] = columnConfiguration;
  } else {
    retrievedColumns.volumeDriverValueSet.push(columnConfiguration);
  }

  return retrievedColumns;
}

export default createSelector(
  columnOrderSelector,
  sortSelector,
  filterSelector,
  hiddenColumnsSelector,
  lockedColumnsSelector,
  selectedVolumeDriverValueSetIdSelector,
  cachedGridConfigurationSelector,
  isVolumeDriverValuesLoadedSelector,
  saveCachedGridConfigurationSelector,
  (columnOrder, sort, filter, hiddenColumns, lockedColumns, selectedVolumeDriverValueSetId, cachedGridConfiguration, isVolumeDriverValuesLoaded,
    saveCachedGridConfiguration) => {

    const columnConfiguration = {
      id: selectedVolumeDriverValueSetId,
      columns: columnOrder ? columnOrder.toJS() : columnOrder,
      sort: sort ? sort.toJS() : sort,
      filter: filter ? filter.toJS() : filter,
      lockedColumns: lockedColumns ? lockedColumns.toJS() : lockedColumns,
      hiddenColumns: hiddenColumns ? hiddenColumns.toJS() : hiddenColumns,
    };

    if (!isVolumeDriverValuesLoaded || !saveCachedGridConfiguration) return cachedGridConfiguration ? cachedGridConfiguration.toJS() : {};

    return updateColumnsConfiguration(selectedVolumeDriverValueSetId, cachedGridConfiguration, columnConfiguration);
  }
);
