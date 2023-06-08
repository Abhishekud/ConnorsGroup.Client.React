import {createSelector} from 'reselect';
import pageSelector from './pageSelector';

export default createSelector(
  pageSelector,
  sidebar => sidebar.get('unitOfMeasureModel')
);
