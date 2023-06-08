import {createSelector} from 'reselect';
import pristineLocationProfilesSelector from './pristineLocationProfilesSelector';

export default createSelector(
  pristineLocationProfilesSelector,
  pristineLocationProfiles => pristineLocationProfiles.sortBy(lp => lp.get('name')).valueSeq().toArray()
);
