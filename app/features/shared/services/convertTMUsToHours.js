import {HOURS_PER_TMU} from '../constants/tmuConversionFactors';

export default function (tmus) {
  return tmus * HOURS_PER_TMU;
}
