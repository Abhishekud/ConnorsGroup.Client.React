import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import selectedVolumeDriverValueSetIdSelector from './selectedVolumeDriverValueSetIdSelector';
import {List} from 'immutable';

const sortingSelector = createSelector(
  pageSelector,
  page => page.get('sorts')
);

export default createSelector(
  sortingSelector,
  selectedVolumeDriverValueSetIdSelector,
  (sort, selectedVolumeDriverValueSetId) =>
    sort.get(selectedVolumeDriverValueSetId) || new List()
);
