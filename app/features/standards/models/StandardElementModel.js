import {Record} from 'immutable';
import {STANDARD_ELEMENT} from '../constants/standardItemTypes';
import {ESTIMATE} from '../../elements/constants/elementTypes';

export default Record({
  type: STANDARD_ELEMENT,
  id: null,
  index: null,
  name: null,
  normalTimeMeasurementUnits: 0,
  standardElementGroupId: null,
  elementType: ESTIMATE,
  elementId: null,
  elementStatus: null,
  unitOfMeasureId: 0,
  unitOfMeasureName: '',
  measuredTimeMeasurementUnits: 0,
  frequencyFormula: '1',
  frequencyValue: 1,
  internal: false,
  machineAllowance: false,
  comment: '',
  concurrencyToken: null,
});
