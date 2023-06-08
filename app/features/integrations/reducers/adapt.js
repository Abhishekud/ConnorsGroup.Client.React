import {Map} from 'immutable';
import {SELECT_ADAPT_LOCATION_FILTER} from '../actions/selectADAPTLocationFilter';
import {SELECT_ADAPT_EXPORT_FULFILLED} from '../actions/selectADAPTExport';
import {SELECT_ADAPT_EXPORT_FORMAT_FULFILLED} from '../actions/selectADAPTExportFormat';
import {DEFAULT} from '../../shared/constants/exportFormatTypes';


const initialState = new Map({
  selectedOrgHierarchyLevelOption: '',
  selectedExport: '',
  selectedExportFormat: DEFAULT,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_ADAPT_LOCATION_FILTER:
      return state.set('selectedOrgHierarchyLevelOption', action.payload.locationFilter);
    case SELECT_ADAPT_EXPORT_FULFILLED:
      return state.set('selectedExport', action.payload);
    case SELECT_ADAPT_EXPORT_FORMAT_FULFILLED:
      return state.set('selectedExportFormat', action.payload);

    default:
      return state;
  }
}
