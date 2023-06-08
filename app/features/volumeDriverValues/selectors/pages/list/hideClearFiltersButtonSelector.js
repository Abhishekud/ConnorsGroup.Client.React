import {createSelector} from 'reselect';
import pageSelector from './pageSelector';

export default createSelector(
  pageSelector,
  page => !page.getIn(['filters', page.get('selectedVolumeDriverValueSetId'), 'filters'])?.size
);
