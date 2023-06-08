import {createSelector} from 'reselect';
import selectedFilingFieldSelector from './selectedStandardFilingFieldSelector';

export default createSelector(
  selectedFilingFieldSelector,
  selectedFilingField => selectedFilingField.get('id')
);
