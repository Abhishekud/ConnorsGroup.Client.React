import {createSelector} from 'reselect';
import volumeDriverValueSetsSelector from './volumeDriverValueSetsSelector';

export default createSelector(
  volumeDriverValueSetsSelector,
  volumeDriverValueSets => volumeDriverValueSets.filter(volumeDriverValueSet => volumeDriverValueSet.get('selected'))
);
