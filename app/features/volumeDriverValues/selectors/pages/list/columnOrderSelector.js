import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import selectedVolumeDriverValueSetIdSelector from './selectedVolumeDriverValueSetIdSelector';
import {List} from 'immutable';

const columnReorder = createSelector(
  pageSelector,
  page => page.get('columnOrder')
);

export default createSelector(
  columnReorder,
  selectedVolumeDriverValueSetIdSelector,
  (order, selectedVolumeDriverValueSetId) => {
    if (order.get(selectedVolumeDriverValueSetId)) {
      return order.get(selectedVolumeDriverValueSetId);
    }
    return List();
  }
);
