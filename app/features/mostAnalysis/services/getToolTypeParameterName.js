import {
  FASTEN,
  LOOSEN,
  CUT,
  SURFACE_TREAT,
  MEASURE,
  RECORD,
  THINK,
} from '../constants/toolTypes';

export default function (toolType) {
  switch (toolType) {
    case FASTEN:
      return 'F';

    case LOOSEN:
      return 'L';

    case CUT:
      return 'C';

    case SURFACE_TREAT:
      return 'S';

    case MEASURE:
      return 'M';

    case RECORD:
      return 'R';

    case THINK:
      return 'T';

    default:
      throw new Error(`Unknown Tool Type ${toolType}`);
  }
}
