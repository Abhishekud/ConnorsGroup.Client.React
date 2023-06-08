import autoBind from 'react-autobind';
import classNames from 'classnames';
import numeral from 'numeral';
import {FormattedTMUs, LinkWithTooltip} from '../../shared/components';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';

export default class StandardElementDetails extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleToggleComment() {
    const {onToggleComment, standardElementId} = this.props;
    onToggleComment(standardElementId);
  }

  render() {
    const {
      internal, frequencyFormula, frequencyValue, unitOfMeasureName, normalTimeMeasurementUnits,
      timeFormat, commentCollapsed, commentEntered, machineAllowance, standardElementId, hasBetaAccess,
    } = this.props;

    const commentIconClasses = classNames(
      'clickable', 'fa',
      {
        'fa-commenting-o': commentEntered && commentCollapsed,
        'fa-comment-o': !commentEntered && commentCollapsed,
        'fa-commenting': commentEntered && !commentCollapsed,
        'fa-comment': !commentEntered && !commentCollapsed,
      });

    const internalIconClasses = classNames(
      'fa',
      {
        'fa-toggle-on': internal,
        'fa-toggle-off': !internal,
      });

    const machineAllowanceIconClasses = classNames(
      'fa',
      {
        'fa-toggle-on': machineAllowance,
        'fa-toggle-off': !machineAllowance,
      });

    return (
      <div className="details">
        <div className="frequency-formula">{frequencyFormula}</div>

        <div className="frequency-value">
          <LinkWithTooltip tooltip={frequencyValue.toString()} href="#" id={`frequency-Value-tooltip-${standardElementId}`}>
            <span>{numeral(frequencyValue).format('0,0.0000')}</span>
          </LinkWithTooltip>
        </div>

        <div className="unit-of-measure">{unitOfMeasureName}</div>
        {hasBetaAccess && <LinkWithTooltip tooltip="Incentive Opportunity Allowance" href="#" id={`machine-allowance-tooltip-${standardElementId}`}>
          <div className="toggle-switch-indicator"><i className={machineAllowanceIconClasses} /></div>
        </LinkWithTooltip>}
        <LinkWithTooltip tooltip="Internal" href="#" id={`internal-tooltip-${standardElementId}`}>
          <div className="toggle-switch-indicator"><i className={internalIconClasses} /></div>
        </LinkWithTooltip>
        <div className="comment-indicator">
          <i className={commentIconClasses} onClick={this.handleToggleComment} />
        </div>
        <div className="normal-time">
          <FormattedTMUs
            timeMeasurementUnits={normalTimeMeasurementUnits}
            timeFormat={timeFormat}
            formattedTMUsId={standardElementId} />
        </div>

      </div>
    );
  }
}

StandardElementDetails.propTypes = {
  standardElementId: PropTypes.number.isRequired,
  internal: PropTypes.bool.isRequired,
  machineAllowance: PropTypes.bool.isRequired,
  frequencyFormula: PropTypes.string.isRequired,
  frequencyValue: PropTypes.number.isRequired,
  unitOfMeasureName: PropTypes.string.isRequired,
  normalTimeMeasurementUnits: PropTypes.number.isRequired,

  timeFormat: PropTypes.string.isRequired,
  commentCollapsed: PropTypes.bool.isRequired,
  commentEntered: PropTypes.bool.isRequired,
  onToggleComment: PropTypes.func.isRequired,
};
