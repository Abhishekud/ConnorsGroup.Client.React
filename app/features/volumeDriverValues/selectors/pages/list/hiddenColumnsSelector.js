import {Map} from 'immutable';
import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import selectedVolumeDriverValueSetIdSelector from './selectedVolumeDriverValueSetIdSelector';

const hiddenColumnSelector = createSelector(
  pageSelector,
  page => page.get('hiddenColumns')
);

export default createSelector(
  hiddenColumnSelector,
  selectedVolumeDriverValueSetIdSelector,
  (hiddenColumn, selectedVolumeDriverValueSetId) => {
    if (hiddenColumn.get(selectedVolumeDriverValueSetId)) {
      return hiddenColumn.get(selectedVolumeDriverValueSetId);
    }
    return new Map();
  }
);
