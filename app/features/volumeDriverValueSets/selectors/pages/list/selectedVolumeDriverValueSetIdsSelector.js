import {createSelector} from 'reselect';
import selectedVolumeDriverValueSetsSelector from './selectedVolumeDriverValueSetsSelector';

export default createSelector(
  selectedVolumeDriverValueSetsSelector,
  volumeDriverValueSets => volumeDriverValueSets.filter(vdvs => vdvs.get('selected')).keySeq().toArray()
);
