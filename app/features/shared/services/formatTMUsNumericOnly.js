import numeral from 'numeral';
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
      return numeral(tmus).format('0');

    case SECONDS:
      return numeral(convertTMUsToSeconds(tmus)).format('0.00');

    case MINUTES:
      return numeral(convertTMUsToMinutes(tmus)).format('0.000');

    case HOURS:
      return numeral(convertTMUsToHours(tmus)).format('0.0000');

    default:
      return '';
  }
}
