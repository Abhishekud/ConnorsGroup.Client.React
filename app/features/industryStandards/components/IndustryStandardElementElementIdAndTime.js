import autoBind from 'react-autobind';
import {withRouter} from 'react-router';
import {FormattedTMUs} from '../../shared/components';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {elementTypes} from '../../elements/constants';

class IndustryStandardElementElementIdAndTime extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }


  handleOpenElement() {
    const {router, elementId, elementType, params, location, onToggleIndustryStandardElementProfile, standardElementId} = this.props;
    if (elementId) {
      let moduleType = 'non-most-industry-elements';
      if (elementType === elementTypes.MOST) moduleType = 'most-industry-elements';
      router.push(`/${moduleType}/${params.id}?elementId=${elementId}&standardId=${location.query.standardId}`);
    } else if (elementType === elementTypes.MOST || elementType === elementTypes.TIMED) {
      onToggleIndustryStandardElementProfile(standardElementId, elementType);
    }
  }

  render() {
    const {elementId, measuredTimeMeasurementUnits, timeFormat, elementType} = this.props;
    const additionalClassName = (elementType === elementTypes.MOST || elementType === elementTypes.TIMED) ? 'clickable' : '';
    const displayElementId = elementId ? elementId : '--';
    return (
      <div className="identifier-and-time-container">
        <div className={`element-id ${additionalClassName}`} onClick={this.handleOpenElement} >{additionalClassName ? displayElementId : ''}</div>
        <FormattedTMUs timeMeasurementUnits={measuredTimeMeasurementUnits} timeFormat={timeFormat} formattedTMUsId={elementId} />
      </div>
    );
  }
}

IndustryStandardElementElementIdAndTime.propTypes = {
  elementId: PropTypes.number,
  measuredTimeMeasurementUnits: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  timeFormat: PropTypes.string.isRequired,
  onToggleIndustryStandardElementProfile: PropTypes.func.isRequired,
  elementType: PropTypes.string,
};

export default withRouter(IndustryStandardElementElementIdAndTime);
