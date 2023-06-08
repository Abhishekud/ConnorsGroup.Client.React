import {createSelector} from 'reselect';
import pageSelector from './pageSelector';

export default createSelector(
  pageSelector,
  page => page.get('schedules').get('effectiveTimeZone'),
);
