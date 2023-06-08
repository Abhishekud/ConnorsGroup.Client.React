import {createSelector} from 'reselect';
import standardItemsSelector from './standardItemsSelector';
import {STANDARD_ELEMENT_GROUP} from '../../../constants/standardItemTypes';

export default createSelector(
  standardItemsSelector,
  standardItems => standardItems.filter(si => si.get('type') === STANDARD_ELEMENT_GROUP).size || 0
);
