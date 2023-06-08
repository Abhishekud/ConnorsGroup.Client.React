import {createSelector} from 'reselect';
import pristineVolumeDriverMappingSetsSelector from './pristineVolumeDriverMappingSetsSelector';
import volumeDriverMappingSetIdSelector from './volumeDriverMappingSetIdSelector';

export default () =>
  createSelector(
    pristineVolumeDriverMappingSetsSelector,
    volumeDriverMappingSetIdSelector,
    (pristineCCs, ccId) => pristineCCs.get(ccId)
  );
