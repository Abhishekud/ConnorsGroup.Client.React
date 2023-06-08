import {BASIC_MOST, MINI_MOST} from '../constants/mostTypes';
import getBasicMOSTParameterIndexValues from './getBasicMOSTParameterIndexValues';
import getMiniMOSTParameterIndexValues from './getMiniMOSTParameterIndexValues';

export default function (mostType, mostPhaseName, mostParameterName) {
  switch (mostType) {
    case BASIC_MOST:
      return getBasicMOSTParameterIndexValues(mostPhaseName, mostParameterName);
    case MINI_MOST:
      return getMiniMOSTParameterIndexValues(mostPhaseName, mostParameterName);
    default:
      return [0];
  }
}
