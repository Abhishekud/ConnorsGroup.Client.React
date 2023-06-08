import {createSelector} from 'reselect';
import selectedADAPTExportSelector from './selectedADAPTExportSelector';
import selectedADAPTExportFormatSelector from './selectedADAPTExportFormatSelector';
import {TASKS, STORE_DRIVERS} from '../../constants/adaptIntegrations';

export default createSelector(
  selectedADAPTExportSelector,
  selectedADAPTExportFormatSelector,
  (selectedExport, selectedFormat) => {
    let exportType = 'exporttask';
    switch (selectedExport) {
      case TASKS:
        exportType = 'exporttask';
        break;
      case STORE_DRIVERS:
        exportType = 'exportstoredrivers';
        break;
    }
    return exportId => `${process.env.API_BASE_URL}adapt/${exportType}/${exportId}?format=${selectedFormat}`;
  }
);
