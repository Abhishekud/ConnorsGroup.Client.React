import {SECONDS_PER_TMU, MINUTES_PER_TMU, HOURS_PER_TMU} from '../constants/tmuConversionFactors';
import {SECONDS, MINUTES, HOURS} from '../constants/timeFormats';

export default function (time, timeFormat) {
  switch (timeFormat) {
    case SECONDS:
      return time * SECONDS_PER_TMU;

    case MINUTES:
      return time * MINUTES_PER_TMU;

    case HOURS:
      return time * HOURS_PER_TMU;

    default:
      return time;
  }
}
