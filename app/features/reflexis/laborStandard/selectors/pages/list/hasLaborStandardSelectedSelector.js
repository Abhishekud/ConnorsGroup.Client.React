import {createSelector} from 'reselect';
import allLaborStandardsSelectedSelector from './allLaborStandardsSelectedSelector';
import selectedLaborStandardIdsSelector from './selectedLaborStandardIdsSelector';

export default createSelector(
  allLaborStandardsSelectedSelector,
  selectedLaborStandardIdsSelector,
  (allLaborStandardsSelected, selected) => allLaborStandardsSelected || selected.size > 0
);
