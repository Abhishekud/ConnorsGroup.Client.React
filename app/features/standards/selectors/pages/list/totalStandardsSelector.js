import {createSelector} from 'reselect';
import standardsListSelector from './standardsListSelector';

export default createSelector(
  standardsListSelector,
  standards => standards.size
);
