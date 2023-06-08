export const UOMDraft = 'UOMDraft';
export const UOMProduction = 'UOMProduction';
export const WIM = 'WIM';
export const WIM_KRONOS = 'WIMKronos';

export default function (scheduleType) {
  let name = '';
  switch (scheduleType) {
    case UOMDraft:
      name = 'Draft Output Files';
      break;
    case UOMProduction:
      name = 'Production Output Files';
      break;
    case WIM:
      name = 'WIM Files';
      break;
    case WIM_KRONOS:
      name = 'WIM Kronos Files';
      break;
  }
  return name;
}
