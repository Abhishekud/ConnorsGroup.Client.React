import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import selectedVolumeDriverValueSetIdSelector from './selectedVolumeDriverValueSetIdSelector';

const filteringSelector = createSelector(
  pageSelector,
  page => page.get('filters')
);

export default createSelector(
  filteringSelector,
  selectedVolumeDriverValueSetIdSelector,
  (filter, selectedVolumeDriverValueSetId) =>
    filter.get(selectedVolumeDriverValueSetId) || null
);
