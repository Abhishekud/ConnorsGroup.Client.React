import React from 'react';
import {PropTypes} from 'prop-types';
import IndustryStandardUnitOfMeasure from './IndustryStandardUnitOfMeasure';

export default function IndustryStandardUnitsOfMeasure({standardUnitsOfMeasure, timeFormat, hasBetaAccess}) {
  return (
    <div className="standard-units-of-measure">
      {standardUnitsOfMeasure.map(suom =>
        (<IndustryStandardUnitOfMeasure
          key={suom.get('id')}
          standardUnitOfMeasure={suom}
          timeFormat={timeFormat}
          hasBetaAccess={hasBetaAccess} />))}
    </div>
  );
}

IndustryStandardUnitsOfMeasure.propTypes = {
  standardUnitsOfMeasure: PropTypes.array.isRequired,
  timeFormat: PropTypes.string.isRequired,
};
