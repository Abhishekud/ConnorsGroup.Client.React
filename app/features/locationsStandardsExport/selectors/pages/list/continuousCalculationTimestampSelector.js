import {createSelector} from 'reselect';
import locationsStandardsExportDataSelector from './locationsStandardsExportDataSelector';

export default createSelector(
  locationsStandardsExportDataSelector,
  locationsStandardsExportData => {
    if (locationsStandardsExportData.size > 0) {
      return locationsStandardsExportData.first().get('createdTimestamp');
    }

    return null;
  }
);
