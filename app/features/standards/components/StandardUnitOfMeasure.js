import React from 'react';
import {PropTypes} from 'prop-types';
import {
  formatTMUs,
  formatTMUsTooltip,
} from '../../shared/services';
import {LinkWithTooltip} from '../../shared/components';

export default function StandardUnitOfMeasure({standardUnitOfMeasure, timeFormat, hasBetaAccess}) {
  return (
    <div className="standard-uom">
      <h5 className="uom-name">{standardUnitOfMeasure.get('unitOfMeasureName')}</h5>
      <div className="uom-times">

        <div className="uom-time">
          <span>Total Normal Time</span>
          <LinkWithTooltip id={`${standardUnitOfMeasure.get('id')}-nrmltmu`} tooltip={formatTMUsTooltip(standardUnitOfMeasure.get('totalNormalTimeMeasurementUnits'), timeFormat)} href="#">
            <span>{formatTMUs(standardUnitOfMeasure.get('totalNormalTimeMeasurementUnits'), timeFormat)}</span>
          </LinkWithTooltip>
        </div>

        {hasBetaAccess && <div className="uom-time">
          <span>Total Incentive Oppty Standard</span>
          <LinkWithTooltip id={`${standardUnitOfMeasure.get('id')}-macstmu`} tooltip={formatTMUsTooltip(standardUnitOfMeasure.get('totalMachineStandardTimeMeasurementUnits'), timeFormat)} href="#">
            <span>{formatTMUs(standardUnitOfMeasure.get('totalMachineStandardTimeMeasurementUnits'), timeFormat)}</span>
          </LinkWithTooltip>
        </div>}

        <div className="uom-time">
          <span>Total Standard Time</span>
          <LinkWithTooltip id={`${standardUnitOfMeasure.get('id')}-stmu`} tooltip={formatTMUsTooltip(standardUnitOfMeasure.get('totalStandardTimeMeasurementUnits'), timeFormat)} href="#">
            <span>{formatTMUs(standardUnitOfMeasure.get('totalStandardTimeMeasurementUnits'), timeFormat)}</span>
          </LinkWithTooltip>
        </div>
      </div>
    </div>
  );
}

StandardUnitOfMeasure.propTypes = {
  standardUnitOfMeasure: PropTypes.object.isRequired,
  timeFormat: PropTypes.string.isRequired,
};
