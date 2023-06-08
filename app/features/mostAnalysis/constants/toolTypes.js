import {OrderedSet} from 'immutable';

export const FASTEN = 'Fasten';
export const LOOSEN = 'Loosen';
export const CUT = 'Cut';
export const SURFACE_TREAT = 'SurfaceTreat';
export const MEASURE = 'Measure';
export const RECORD = 'Record';
export const THINK = 'Think';
export const ALL = new OrderedSet([FASTEN, LOOSEN, CUT, SURFACE_TREAT, MEASURE, RECORD, THINK]);

export function displayName(toolType) {
  switch (toolType) {
    case SURFACE_TREAT:
      return 'Surface Treat';

    default:
      return toolType;
  }
}
