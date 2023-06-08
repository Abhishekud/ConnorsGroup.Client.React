import {createSelector} from 'reselect';
import standardsSelector from './standardsSelector';

export default createSelector(
  standardsSelector,
  standards => standards.filter(standard => standard.get('selected'))
);
