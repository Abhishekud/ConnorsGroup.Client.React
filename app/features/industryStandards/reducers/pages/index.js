import {combineReducers} from 'redux';
import list from './list';
import industryStandardProfilePage from './industryStandardProfilePage';
import mostIndustryStandardElementProfile from './mostIndustryStandardElementProfile';
import nonMOSTIndustryStandardElementProfile from './nonMOSTIndustryStandardElementProfile';

export default combineReducers({
  list,
  industryStandardProfilePage,
  mostIndustryStandardElementProfile,
  nonMOSTIndustryStandardElementProfile,
});
