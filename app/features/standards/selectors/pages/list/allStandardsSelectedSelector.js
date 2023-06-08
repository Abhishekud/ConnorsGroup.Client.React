import {createSelector} from 'reselect';
import standardsListSelector from './standardsListSelector';

export default createSelector(
  standardsListSelector,
  standards => standards.count() !== 0 && !standards.some(s => !s.get('selected'))
);
