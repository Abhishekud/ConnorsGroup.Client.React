import {createSelector} from 'reselect';
import selectedLaborDriverSelector from './selectedLaborDriverSelector';

export default createSelector(
  selectedLaborDriverSelector,
  selected => (selected.isEmpty() ? 0 : 1)
);
