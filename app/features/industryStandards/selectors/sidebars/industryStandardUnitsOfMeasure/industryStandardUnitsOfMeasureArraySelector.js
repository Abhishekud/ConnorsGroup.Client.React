import {createSelector} from 'reselect';
import sidebarSelector from './sidebarSelector';

export default createSelector(
  sidebarSelector,
  sidebar => sidebar
    .valueSeq()
    .sortBy(suom => suom.get('unitOfMeasureName'))
    .toArray()
);
