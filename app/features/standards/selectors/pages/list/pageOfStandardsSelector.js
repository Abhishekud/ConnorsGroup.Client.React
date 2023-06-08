import {createSelector} from 'reselect';
import standardsListSelector from './standardsListSelector';
import skipSelector from './skipSelector';
import takeSelector from './takeSelector';

export default createSelector(
  standardsListSelector,
  skipSelector,
  takeSelector,
  (standards, skip, take) => standards.skip(skip).take(take)
);
