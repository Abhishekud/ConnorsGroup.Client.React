/* eslint-disable react/display-name */
import {sequenceModelTypes} from '../constants';

export default function (mostStep) {
  switch (mostStep.get('sequenceModelType')) {
    case sequenceModelTypes.TOOL_USE:
    case sequenceModelTypes.EQUIPMENT_USE: {
      const currentNumberOfObjectsManipulated =
        mostStep.get('numberOfObjectsManipulated');

      return currentNumberOfObjectsManipulated === null || currentNumberOfObjectsManipulated === ''
        ? 1 : currentNumberOfObjectsManipulated;
    }

    default:
      return null;
  }
}
