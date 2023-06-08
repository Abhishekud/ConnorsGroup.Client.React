import {createSelector} from 'reselect';
import industryAllowancesSelector from './industryAllowancesSelector';

export default createSelector(
  industryAllowancesSelector,
  industryAllowances => industryAllowances.filter(e => e.get('selected'))
);
