import {convertToTMUs} from '../../shared/services';

export default function (nonMOSTStep, timeFormat) {
  if (nonMOSTStep.get('simultaneous')) return 0;

  let adjustedTMUs = convertToTMUs(nonMOSTStep.get('measuredTimeMeasurementUnits'), timeFormat);

  const frequency = Number(nonMOSTStep.get('frequency'));
  if (!Number.isNaN(frequency) && frequency > 0) adjustedTMUs *= frequency;

  return adjustedTMUs;
}
