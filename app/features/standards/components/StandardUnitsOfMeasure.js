import React from 'react';
import {PropTypes} from 'prop-types';
import StandardUnitOfMeasure from './StandardUnitOfMeasure';

export default function StandardUnitsOfMeasure({standardUnitsOfMeasure, timeFormat, hasBetaAccess}) {
  return (
    <div className="standard-units-of-measure">
      {standardUnitsOfMeasure.map(suom =>
        (<StandardUnitOfMeasure
          key={suom.get('id')}
          standardUnitOfMeasure={suom}
          timeFormat={timeFormat}
          hasBetaAccess={hasBetaAccess} />))}
    </div>
  );
}

StandardUnitsOfMeasure.propTypes = {
  standardUnitsOfMeasure: PropTypes.array.isRequired,
  timeFormat: PropTypes.string.isRequired,
};
