import {createSelector} from 'reselect';
import dataSelector from './dataSelector';

export default createSelector(
  dataSelector,
  elements => elements.size
);
