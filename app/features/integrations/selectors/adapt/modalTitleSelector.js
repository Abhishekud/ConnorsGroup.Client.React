import {createSelector} from 'reselect';
import selectedADAPTExportSelector from './selectedADAPTExportSelector';
import {TASKS, STORE_DRIVERS} from '../../constants/adaptIntegrations';

export default createSelector(
  selectedADAPTExportSelector,
  selectedExport => {
    switch (selectedExport) {
      case TASKS:
        return 'Export ADAPT Tasks';
      case STORE_DRIVERS:
        return 'Export ADAPT Store Drivers';
      default:
        return '';
    }
  }
);
