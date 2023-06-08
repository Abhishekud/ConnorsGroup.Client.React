import {createSelector} from 'reselect';
import industryStandardsSelector from './industryStandardsSelector';

export default createSelector(
  industryStandardsSelector,
  industryStandards => industryStandards.filter(e => e.get('selected'))
);
