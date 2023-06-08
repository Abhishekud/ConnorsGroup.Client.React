import {createSelector} from 'reselect';
import locationsStandardsExportDataSelector from './locationsStandardsExportDataSelector';

export default createSelector(
  locationsStandardsExportDataSelector,
  data => data.size
);
