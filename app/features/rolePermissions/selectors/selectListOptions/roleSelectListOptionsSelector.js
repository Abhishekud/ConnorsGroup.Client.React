import {createSelector} from 'reselect';
import selectListOptionsStateSelector from './selectListOptionsStateSelector';

export default createSelector(
  selectListOptionsStateSelector,
  selectListOptions => selectListOptions.get('roles').toJS()
);
