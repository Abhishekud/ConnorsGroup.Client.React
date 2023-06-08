import autoBind from 'react-autobind';
import {withRouter} from 'react-router';
import {FormattedTMUs} from '../../shared/components';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {elementTypes} from '../../elements/constants';
import {getDynamicRoute} from '../../shared/services';

class StandardElementElementIdAndTime extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {onFieldChange, standardElementId} = this.props;
    onFieldChange(standardElementId, event);
  }

  handleOpenElement() {
    const {router, elementId, elementType, params, standardElementId, location} = this.props;

    if (!elementId) return;
    const route = getDynamicRoute(location, '', {standardElementType: elementType, elementId, standardId: params.id, standardElementId});
    router.push(route);
  }

  render() {
    const {elementId, measuredTimeMeasurementUnits, timeFormat, elementType} = this.props;
    const additionalClassName = (elementType === elementTypes.MOST || elementType === elementTypes.TIMED) && elementId ? 'clickable' : '';
    return (
      <div className="identifier-and-time-container">
        <div className={`element-id ${additionalClassName}`}
          onClick={this.handleOpenElement}>{elementId}</div>
        <FormattedTMUs timeMeasurementUnits={measuredTimeMeasurementUnits} timeFormat={timeFormat} formattedTMUsId={elementId} />
      </div>
    );
  }
}

StandardElementElementIdAndTime.propTypes = {
  standardElementId: PropTypes.number.isRequired,
  elementId: PropTypes.number,
  elementType: PropTypes.string,
  measuredTimeMeasurementUnits: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  timeFormat: PropTypes.string.isRequired,
};

export default withRouter(StandardElementElementIdAndTime);
