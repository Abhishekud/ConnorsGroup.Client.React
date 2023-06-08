import {Map} from 'immutable';
import {createSelector} from 'reselect';
import pageSelector from './pageSelector';


export default createSelector(
  pageSelector,
  page => page.getIn(['lockedColumns', page.get('selectedVolumeDriverValueSetId')]) ?? new Map()
);
