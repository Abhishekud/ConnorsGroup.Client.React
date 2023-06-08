/* eslint-disable react/display-name */
import {
  sequenceModelTypes,
  equipmentTypes,
} from '../constants';

export default function (mostStep) {
  switch (mostStep.get('sequenceModelType')) {
    case sequenceModelTypes.EQUIPMENT_USE: {
      const equipmentType = mostStep.get('equipmentType');
      return equipmentType === null ? equipmentTypes.KEYBOARD : equipmentType;
    }

    default:
      return null;
  }
}
