import {createSelector} from 'reselect';
import selectedLaborPeriodSelector from './selectedLaborPeriodSelector';

export default createSelector(
  selectedLaborPeriodSelector,
  selected => (selected === null ? 0 : 1)
);
