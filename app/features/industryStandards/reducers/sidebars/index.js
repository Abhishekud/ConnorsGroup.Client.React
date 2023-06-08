import {combineReducers} from 'redux';
import industryStandardsListAddSidebar from './industryStandardsListAddSidebar';
import industryStandardUnitsOfMeasure from './industryStandardUnitsOfMeasure';
import industryStandardDetails from './industryStandardDetails';

export default combineReducers({
  industryStandardsListAddSidebar,
  industryStandardUnitsOfMeasure,
  industryStandardDetails,
});
