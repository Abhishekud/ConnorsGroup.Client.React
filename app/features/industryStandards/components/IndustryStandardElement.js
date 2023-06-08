import autoBind from 'react-autobind';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {StandardElementModel} from '../models';
import IndustryStandardElementComment from './IndustryStandardElementComment';
import IndustryStandardElementDetails from './IndustryStandardElementDetails';
import IndustryStandardElementElementIdAndTime from './IndustryStandardElementElementIdAndTime';
import {statusClass} from '../../standards/constants/standardStatuses';

export default class IndustryStandardElement extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      standardElement, timeFormat, commentCollapsed, onToggleComment, onToggleIndustryStandardElementProfile, hasBetaAccess,
    } = this.props;

    return (
      <div className="industry-standard-element-container">


        <div id={`standard-item-${standardElement.id}`} className="industry-standard-element" >
          <div className="content">


            <div className={`industry-standard-item-index ${statusClass(standardElement.elementStatus)}`}>{standardElement.index}</div>


            <IndustryStandardElementElementIdAndTime
              elementId={standardElement.elementId}
              standardElementId={standardElement.id}
              measuredTimeMeasurementUnits={standardElement.measuredTimeMeasurementUnits}
              timeFormat={timeFormat}
              elementType={standardElement.elementType}
              onToggleIndustryStandardElementProfile={onToggleIndustryStandardElementProfile} />
            <div className="details-container">
              <div className="header">
                <span>{standardElement.name}</span>
              </div>

              <IndustryStandardElementDetails
                standardElementId={standardElement.id}
                internal={standardElement.internal}
                machineAllowance={standardElement.machineAllowance}
                frequencyFormula={standardElement.frequencyFormula}
                frequencyValue={standardElement.frequencyValue}
                unitOfMeasureName={standardElement.unitOfMeasureName}
                normalTimeMeasurementUnits={standardElement.normalTimeMeasurementUnits}
                timeFormat={timeFormat}
                onToggleComment={onToggleComment}
                commentCollapsed={commentCollapsed}
                comment={standardElement.comment}
                hasBetaAccess={hasBetaAccess} />
            </div>

          </div>

          <IndustryStandardElementComment
            comment={standardElement.comment}
            collapsed={commentCollapsed} />
        </div>


      </div>
    );
  }
}

IndustryStandardElement.propTypes = {
  standardElement: PropTypes.instanceOf(StandardElementModel).isRequired,
  timeFormat: PropTypes.string.isRequired,
  onToggleComment: PropTypes.func.isRequired,
  onToggleIndustryStandardElementProfile: PropTypes.func.isRequired,
};
