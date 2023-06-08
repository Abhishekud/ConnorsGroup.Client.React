import {combineReducers} from 'redux';
import bulkEditLaborStandards from './bulkEditLaborStandards';
import editLaborStandard from './editLaborStandard';

export default combineReducers({
  bulkEditLaborStandards,
  editLaborStandard,
});

