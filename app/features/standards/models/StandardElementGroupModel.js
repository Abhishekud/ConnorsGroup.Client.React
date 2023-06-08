import {Record} from 'immutable';
import {STANDARD_ELEMENT_GROUP} from '../constants/standardItemTypes';

export default Record({
  type: STANDARD_ELEMENT_GROUP,
  id: null,
  index: null,
  name: null,
  normalTimeMeasurementUnits: 0,
  standardElementGroupId: null,
  selected: false,
  concurrencyToken: null,
});
