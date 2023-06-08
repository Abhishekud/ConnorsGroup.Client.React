import {createSelector} from 'reselect';
import pageSelector from './pageSelector';

export default createSelector(
  pageSelector,
  page => !page.getIn(['sorts', page.get('selectedVolumeDriverValueSetId')])?.size
);
