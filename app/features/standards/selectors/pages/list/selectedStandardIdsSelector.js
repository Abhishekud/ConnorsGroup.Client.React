import {createSelector} from 'reselect';
import selectedStandardsSelector from './selectedStandardsSelector';

export default createSelector(
  selectedStandardsSelector,
  standards => standards.map(std => std.get('id'))
);
