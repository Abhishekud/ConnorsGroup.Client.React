import {createSelector} from 'reselect';
import volumeDriverMappingsSelector from './volumeDriverMappingsSelector';

export default createSelector(
  volumeDriverMappingsSelector,
  volumeDriverMappings => volumeDriverMappings.filter(volumeDriverMappings => volumeDriverMappings.get('selected'))
);
