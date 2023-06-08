import {createSelector} from 'reselect';
import modelSelector from './modelSelector';

export default createSelector(
  modelSelector,
  model => model.get('success')
);

