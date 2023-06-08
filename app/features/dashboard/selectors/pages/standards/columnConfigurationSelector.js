import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import {isLaborHoursEnabledSelector} from '../../../../shared/selectors/components/settings';

export default createSelector(
  pageSelector, isLaborHoursEnabledSelector,
  (page, isLaborHoursEnabled) => {
    if (!isLaborHoursEnabled) {
      const newColumns = page.get('column').filter(a => a.get('field') !== 'laborHours');
      return newColumns;
    }
    return page.get('column');
  }
);
