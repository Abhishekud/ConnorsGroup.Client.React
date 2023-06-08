import {createSelector} from 'reselect';
import industryElementsSelector from './industryElementsSelector';

export default createSelector(
  industryElementsSelector,
  industryElements => industryElements.filter(e => e.get('selected'))
);
