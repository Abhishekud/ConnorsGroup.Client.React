import convertTMUsToHours from './convertTMUsToHours';
import convertTMUsToMinutes from './convertTMUsToMinutes';
import convertTMUsToSeconds from './convertTMUsToSeconds';
import {
  HOURS,
  MINUTES,
  SECONDS,
  TMUs,
} from '../constants/timeFormats';

export default function (tmus, format) {
  switch (format) {
    case TMUs:
      return `${tmus.toString()}t`;

    case SECONDS:
      return `${convertTMUsToSeconds(tmus).toString()}s`;

    case MINUTES:
      return `${convertTMUsToMinutes(tmus).toString()}m`;

    case HOURS:
      return `${convertTMUsToHours(tmus).toString()}h`;

    default:
      return '';
  }
}
