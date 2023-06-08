import autoBind from 'react-autobind';
import {Map} from 'immutable';
import {ESTIMATE} from '../../elements/constants/elementTypes';
import {TextInput} from '../../forms/components';
import {FormattedTMUs} from '../../shared/components';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';

export default class StandardElementElementIdAndTimeEditor extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {onFieldChange, standardElementId} = this.props;
    onFieldChange(standardElementId, event);
  }

  renderMeasuredTimeMeasurementUnits() {
    const {
      disabled,
      elementType, measuredTimeMeasurementUnits, timeFormat, elementId, validationErrors,
    } = this.props;

    if (elementType === ESTIMATE) {
      return (
        <TextInput
          id="measuredTimeMeasurementUnits" className="text-right"
          disabled={disabled}
          value={measuredTimeMeasurementUnits} onChange={this.handleFieldChange}
          formValidationErrors={validationErrors} />
      );
    }

    return <FormattedTMUs timeMeasurementUnits={measuredTimeMeasurementUnits} timeFormat={timeFormat} formattedTMUsId={elementId} />;
  }

  render() {
    const {elementId} = this.props;

    return (
      <div className="identifier-and-time-container">
        <div className="element-id">{elementId}</div>
        {this.renderMeasuredTimeMeasurementUnits()}
      </div>
    );
  }
}

StandardElementElementIdAndTimeEditor.propTypes = {
  standardElementId: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  elementId: PropTypes.number,
  elementType: PropTypes.string.isRequired,
  measuredTimeMeasurementUnits: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  timeFormat: PropTypes.string.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  onFieldChange: PropTypes.func.isRequired,
};
