import {combineReducers} from 'redux';
import filters from './filters';
import bulkEditElements from './bulkEditElements';
import bulkEditStandards from './bulkEditStandards';
import standardDetails from './standardDetails';
import standardUnitsOfMeasure from './standardUnitsOfMeasure';

export default combineReducers({
  filters,
  bulkEditElements,
  bulkEditStandards,
  standardDetails,
  standardUnitsOfMeasure,
});
