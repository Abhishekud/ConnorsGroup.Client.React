import {createSelector} from 'reselect';
import {filterBy} from '@progress/kendo-data-query';
import volumeDriversArraySelector from './volumeDriversArraySelector';
import filterSelector from './filterSelector';

export default createSelector(
  volumeDriversArraySelector,
  filterSelector,
  (volumeDrivers, filter) => filterBy(volumeDrivers, filter)
);
