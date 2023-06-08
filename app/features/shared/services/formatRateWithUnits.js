import {formatRate} from './';
import {
  HOURS,
  MINUTES,
  SECONDS,
  TMUs,
} from '../constants/timeFormats';

const units = format => {
  switch (format) {
    case TMUs:
      return '/t';

    case SECONDS:
      return '/s';

    case MINUTES:
      return '/m';

    case HOURS:
      return '/h';

    default:
      return '';
  }
};

export default function (tmus, format) {
  const rate = formatRate(tmus, format);
  if (rate === '') {
    return '--';
  }
  return `${rate} ${units(format)}`;
}
