import {createSelector} from 'reselect';
import {orderBy} from '@progress/kendo-data-query';
import filteredVolumeDriversArraySelector from './filteredVolumeDriversArraySelector';
import sortSelector from './sortSelector';

export default createSelector(
  filteredVolumeDriversArraySelector,
  sortSelector,
  (volumeDrivers, sort) => orderBy(volumeDrivers, sort)
);
