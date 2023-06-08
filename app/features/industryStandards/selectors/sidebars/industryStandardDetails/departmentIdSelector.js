import {createSelector} from 'reselect';
import pristineModelSelector from './pristineModelSelector';

export default createSelector(
  pristineModelSelector,
  model => model.get('departmentId')
);
