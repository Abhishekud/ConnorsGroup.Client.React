
import {createSelector} from 'reselect';
import jobClassesSelector from './jobClassesSelector';

export default createSelector(
  jobClassesSelector,
  jobClasses => jobClasses.toList().toJS()
);
