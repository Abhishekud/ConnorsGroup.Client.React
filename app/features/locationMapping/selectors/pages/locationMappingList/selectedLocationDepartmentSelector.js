import {createSelector} from 'reselect';
import locationsSelector from './locationsSelector';

export default createSelector(
  locationsSelector,
  locations => locations.filter(locations => locations.get('selected') && locations.get('checked'))
);
