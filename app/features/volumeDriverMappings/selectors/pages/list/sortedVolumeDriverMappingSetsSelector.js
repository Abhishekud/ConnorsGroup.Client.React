import {createSelector} from 'reselect';
import volumeDriverMappingSetsSelector from './volumeDriverMappingSetsSelector';

export default createSelector(
  volumeDriverMappingSetsSelector,
  volumeDriverMappingSets => volumeDriverMappingSets?.sortBy(cc => cc.get('name'))
);
