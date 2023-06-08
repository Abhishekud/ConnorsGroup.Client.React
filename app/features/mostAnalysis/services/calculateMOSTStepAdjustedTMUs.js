export default function (mostStep) {
  if (mostStep.get('simultaneous')) return 0;

  let adjustedTMUs = mostStep.get('measuredTimeMeasurementUnits');

  const frequency = Number(mostStep.get('frequency'));
  if (!Number.isNaN(frequency) && frequency > 0) adjustedTMUs *= frequency;

  return adjustedTMUs;
}
