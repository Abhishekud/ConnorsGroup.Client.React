import {createSelector} from 'reselect';
import pristineVolumeDriverMappingSetsSelector from './pristineVolumeDriverMappingSetsSelector';

export default createSelector(
  pristineVolumeDriverMappingSetsSelector,
  pristineVolumeDriverMappingSets => pristineVolumeDriverMappingSets.sortBy(cc => cc.get('name')).valueSeq().toArray()
);
