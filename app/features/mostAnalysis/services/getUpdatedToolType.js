/* eslint-disable react/display-name */
import {
  sequenceModelTypes,
  toolTypes,
} from '../constants';

export default function (mostStep) {
  switch (mostStep.get('sequenceModelType')) {
    case sequenceModelTypes.TOOL_USE: {
      const toolType = mostStep.get('toolType');
      return toolType === null ? toolTypes.FASTEN : toolType;
    }

    default:
      return null;
  }
}
