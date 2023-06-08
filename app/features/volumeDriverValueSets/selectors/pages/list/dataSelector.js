import {createSelector} from 'reselect';
import volumeDriverValueSetsSelector from './volumeDriverValueSetsSelector';
import sortSelector from './sortSelector';
import filterSelector from './filterSelector';
import sortedAndFilteredSelectorBuilder from '../../../../customizableGrid/services/sortedAndFilteredSelectorBuilder';

const volumeDriverValueSets = createSelector(
  volumeDriverValueSetsSelector,
  volumeDriverValueSet => volumeDriverValueSet.toList().sortBy(vdvs => -vdvs.get('isDefault'))
);

export default sortedAndFilteredSelectorBuilder(volumeDriverValueSets, sortSelector, filterSelector);
