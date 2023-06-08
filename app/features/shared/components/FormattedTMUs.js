import {formatTMUs} from '../services';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {LinkWithTooltip} from '../../shared/components';
import formatTMUsTooltip from '../../shared/services/formatTMUsTooltip';

export default class FormattedTMUs extends PureComponent {
  render() {
    const {timeMeasurementUnits, timeFormat, formattedTMUsId} = this.props;
    return (
      <LinkWithTooltip tooltip={formatTMUsTooltip(timeMeasurementUnits, timeFormat)} href="#" id={`internal-tooltip-${formattedTMUsId}`}>
        <span>{formatTMUs(timeMeasurementUnits, timeFormat)}</span>
      </LinkWithTooltip>
    );
  }
}

FormattedTMUs.propTypes = {
  timeMeasurementUnits: PropTypes.number.isRequired,
  timeFormat: PropTypes.string.isRequired,
  formattedTMUsId: PropTypes.string,
};
