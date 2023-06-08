import {createSelector} from 'reselect';
import locationsStandardsExportDataSelector from './locationsStandardsExportDataSelector';

export default createSelector(
  locationsStandardsExportDataSelector,
  locationsStandardsExportData => {
    if (locationsStandardsExportData.size > 0) {
      return locationsStandardsExportData.maxBy(lsed => lsed.get('createdTimestamp')).get('createdTimestamp');
    }

    return null;
  }
);
