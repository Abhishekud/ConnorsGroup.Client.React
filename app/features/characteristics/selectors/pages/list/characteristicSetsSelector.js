import {List} from 'immutable';
import {createSelector} from 'reselect';
import pageSelector from './pageSelector';

export default createSelector(
  pageSelector,
  page => page.getIn(['characteristicSets', page.get('selectedDepartmentId')]) ?? new List()
);
